/**
 * Repository: transactionRepo
 * 
 * Purpose:
 * Handles data access and CRUD operations for transaction records. 
 * Currently interacts with pre-loaded mock test data, keeping data storage details 
 * completely decoupled from business logic and React state.
 */


import { transactionRepo } from "../repositories/transactionRepo";
import type { Transaction, Wallet } from "../../../../shared/types/userProfile";

export const walletService = {

  // Validate deposit and withdrawal amounts
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

  // Fetch wallet balance and transaction history from backend
  async fetchWallet(): Promise<Wallet> {
    return await transactionRepo.getWallet();
  },

  // Fetch transaction history separately if needed
  async fetchTransactions(): Promise<Transaction[]> {
    return await transactionRepo.getAll();
  },

  // Add deposit or withdrawal through backend
  async addTransaction(
    type: "Deposit" | "Withdrawal",
    amount: number
  ): Promise<Transaction> {
    return await transactionRepo.add({
      type,
      amount
    });
  },

  // Delete transaction through backend
  async deleteTransaction(id: number): Promise<void> {
    await transactionRepo.delete(id);
  }
};
