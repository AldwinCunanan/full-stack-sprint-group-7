import { Transaction } from "../types/userProfile"; // Adjust path to your types file
import { sampleTransactions } from "../data/sampleTransaction";

/**
 * Transaction Repository
 * Handles CRUD operations for transactions against mock data.
 * Simulates async behavior to mirror a real database or API client.
 */
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