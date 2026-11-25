/**
 * Repository: transactionRepo
 * 
 * Purpose:
 * Handles data access and CRUD operations for transaction records. 
 * Currently interacts with pre-loaded mock test data, keeping data storage details 
 * completely decoupled from business logic and React state.
 */
import { Transaction } from "../types/userProfile"; 
import { sampleTransactions } from "../data/sampleTransaction";

let transactionsStore: Transaction[] = [...sampleTransactions];

export const transactionRepo = {

  // Get all transactions
  async getAll(): Promise<Transaction[]> {
    return [...transactionsStore];
  },

  // Add a new transaction
  async add(newTransaction: Transaction): Promise<Transaction> {
    transactionsStore = [newTransaction, ...transactionsStore];
    return newTransaction;
  },

  // Delete a transaction by its id
  async delete(id: number): Promise<void> {
    transactionsStore = transactionsStore.filter((tx) => tx.id !== id);
  }
};