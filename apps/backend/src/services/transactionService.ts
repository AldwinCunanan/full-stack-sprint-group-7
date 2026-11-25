
import { prisma } from "../db/prisma.js";
import { transactionRepo } from "../repositories/transactionRepository.js";
import { TransactionType } from "../generated/prisma/client.js";

export const walletService = {

  /**
   * Validate transaction amount.
   */
  validateAmount(
    value: string,
    currentBalance: number,
    isWithdrawal: boolean
  ): string {
    const num = Number(value);

    if (!value.trim() || !Number.isFinite(num) || num <= 0) {
      return "Please enter a valid amount greater than $0.";
    }

    if (isWithdrawal && num > currentBalance) {
      return "Insufficient funds! You cannot withdraw more than your available credit.";
    }

    return "";
  },

  /**
   * Calculate balance from transaction history.
   */
  calculateBalance(
    transactions: { type: TransactionType; amount: { toNumber(): number } }[]
  ): number {
    return transactions.reduce((balance, tx) => {
      const amount = tx.amount.toNumber();

      return tx.type === "Deposit"
        ? balance + amount
        : balance - amount;
    }, 0);
  },

  /**
   * Fetch all transactions belonging to a user.
   */
  async fetchTransactions(userId: number) {
    return await transactionRepo.getAll(userId);
  },

  /**
   * Add a deposit or withdrawal.
   * Updates the user's credits and transaction history atomically.
   */
  async addTransaction(
    userId: number,
    type: TransactionType,
    amount: number
  ) {

    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error("Please enter a valid amount greater than $0.");
    }

    const result = await prisma.$transaction(async (tx) => {

      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { credits: true }
      });

      if (!user) {
        throw new Error("User not found.");
      }

      const currentBalance = user.credits.toNumber();

      if (type === "Withdrawal" && amount > currentBalance) {
        throw new Error("Insufficient funds!");
      }

      const decimalAmount = amount.toFixed(2);

      const transaction = await tx.transaction.create({
        data: {
          userId,
          type,
          amount: decimalAmount
        }
      });

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          credits: {
            increment: type === "Deposit"
              ? decimalAmount
              : (-Number(decimalAmount)).toFixed(2)
          }
        }
      });

      return {
        transaction,
        credits: updatedUser.credits
      };
    });

    return {
      ...result.transaction,
      amount: result.transaction.amount.toNumber(),
      date: result.transaction.date.toLocaleDateString()
    };
  },

  /**
   * Delete a transaction belonging to a user.
   */
  async deleteTransaction(
    userId: number,
    id: number
  ): Promise<void> {

    await prisma.$transaction(async (tx) => {

      const transaction = await tx.transaction.findFirst({
        where: {
          id,
          userId
        }
      });

      if (!transaction) {
        throw new Error("Transaction not found.");
      }

      const amount = transaction.amount.toNumber();

      const adjustment =
        transaction.type === "Deposit" ? -amount : amount;

      await tx.user.update({
        where: { id: userId },
        data: {
          credits: {
            increment: adjustment.toFixed(2)
          }
        }
      });

      await tx.transaction.delete({
        where: { id }
      });
    });
  }
};
