/**
 * Repository: transactionRepo
 * 
 * Purpose:
 * Handles data access and CRUD operations for transaction records. 
 * Currently interacts with pre-loaded mock test data, keeping data storage details 
 * completely decoupled from business logic and React state.
 */

import type { Transaction, Wallet } from "../../../../shared/types/userProfile";

const API_URL = "http://localhost:3000/api/wallet";

// Temporary user ID for development.
const USER_ID = 1;

export const transactionRepo = {

  // Get all transactions
  async getAll(): Promise<Transaction[]> {
    const response = await fetch(
      `${API_URL}/${USER_ID}/transactions`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch transactions.");
    }

    const data = await response.json();

    return data.transactions;
  },

  // Add a deposit or withdrawal
  async add(data: {
    type: "Deposit" | "Withdrawal";
    amount: number;
  }): Promise<Transaction> {

    const endpoint = data.type === "Deposit"
      ? "deposit"
      : "withdraw";

    const response = await fetch(
      `${API_URL}/${USER_ID}/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: data.amount
        })
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add transaction.");
    }

    const result = await response.json();

    return result.transaction;
  },

  // Delete a transaction
  async delete(id: number): Promise<void> {
    const response = await fetch(
      `${API_URL}/${USER_ID}/transactions/${id}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete transaction.");
    }
  },

  async getWallet(): Promise<Wallet> {
  const response = await fetch(
    `${API_URL}/${USER_ID}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch wallet.");
  }

  const data = await response.json();

  return data.wallet;
},
};
