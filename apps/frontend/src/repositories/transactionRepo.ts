/**
 * Repository: transactionRepo
 * 
 * Purpose:
 * Handles data access and CRUD operations for transaction records. 
 * Currently interacts with pre-loaded mock test data, keeping data storage details 
 * completely decoupled from business logic and React state.
 */

import { Transaction } from "../../../../shared/types/userProfile";

const API_URL = "http://localhost:3000/api/wallet/transactions";

export const transactionRepo = {

  // Get all transactions
  async getAll(): Promise<Transaction[]> {
    const response = await fetch(API_URL, {
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Failed to fetch transactions.");
    }

    return await response.json();
  },

  // Add a new transaction
  async add(data: {
    type: "Deposit" | "Withdrawal";
    amount: number;
  }): Promise<Transaction> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Failed to add transaction.");
    }

    return await response.json();
  },

  // Delete a transaction
  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Failed to delete transaction.");
    }
  }
};
