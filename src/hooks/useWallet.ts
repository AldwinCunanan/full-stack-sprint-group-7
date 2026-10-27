/**
 * Custom Hook: useWallet
 * 
 * Purpose:
 * Manages presentation-level React state for user credits, transaction history, and UI error messages.
 * 
 * Returned Values & Uses:
 * - credits: current numeric credit balance for display in UI components.
 * - transactions: list of logged transaction objects.
 * - errorMsg: active validation error string (or empty if no error).
 * - deposit(amount): async function to handle credit deposits via walletService.
 * - withdraw(amount): async function to handle credit withdrawals via walletService.
 * - removeTransaction(id): function to delete a logged transaction record.
 */
import { useState, useEffect } from "react";
import { Transaction } from "../types/userProfile"; 
import { walletService } from "../services/walletService";

export function useWallet() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [credits, setCredits] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const loadWalletData = async () => {
    try {
      setLoading(true);
      const data = await walletService.fetchTransactions();
      setTransactions(data);
      setCredits(walletService.calculateBalance(data));
    } catch (err) {
      setErrorMsg("Failed to load wallet data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWalletData();
  }, []);

  const deposit = async (amountStr: string): Promise<boolean> => {
    const error = walletService.validateAmount(amountStr, credits, false);
    if (error) {
      setErrorMsg(error);
      return false;
    }
    setErrorMsg("");
    await walletService.addTransaction("Deposit", Number(amountStr));
    await loadWalletData();
    return true;
  };

  const withdraw = async (amountStr: string): Promise<boolean> => {
    const error = walletService.validateAmount(amountStr, credits, true);
    if (error) {
      setErrorMsg(error);
      return false;
    }
    setErrorMsg("");
    await walletService.addTransaction("Withdrawal", Number(amountStr));
    await loadWalletData();
    return true;
  };

  const removeTransaction = async (id: number): Promise<void> => {
    await walletService.deleteTransaction(id);
    await loadWalletData();
  };

  return {
    credits,
    setCredits,
    transactions,
    setTransactions,
    loading,
    errorMsg,
    deposit,
    withdraw,
    removeTransaction,
  };
}