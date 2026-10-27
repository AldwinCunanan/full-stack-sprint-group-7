import { transactionRepo } from "../repositories/transactionRepo";
import { Transaction } from "../types/userProfile";

export const walletService = {
  
  validateAmount(value: string, currentBalance: number, isWithdrawal: boolean): string {
    const num = Number(value);
    if (!value || isNaN(num) || num <= 0) {
      return "Please enter a valid amount greater than $0.";
    }
    if (isWithdrawal && num > currentBalance) {
      return "Insufficient funds! You cannot withdraw more than your available credit.";
    }
    return "";
  },

  calculateBalance(transactions: Transaction[]): number {
    return transactions.reduce((acc, tx) => {
      return tx.type === "Deposit" ? acc + tx.amount : acc - tx.amount;
    }, 0);
  },

  async fetchTransactions(): Promise<Transaction[]> {
    return await transactionRepo.getAll();
  },

  async addTransaction(type: "Deposit" | "Withdrawal", amount: number): Promise<Transaction> {
    const newTx: Transaction = {
      id: Date.now(), 
      type,
      amount,
      date: new Date().toLocaleDateString(),
    };
    return await transactionRepo.add(newTx);
  },

  async deleteTransaction(id: number): Promise<void> {
    await transactionRepo.delete(id);
  },
};