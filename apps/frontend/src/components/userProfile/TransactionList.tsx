/**
 * Sprint 3 Architectural Note:
 * Presentational component (View layer) that renders the user's transaction history.
 * It receives transactions and callback handlers via props, remaining completely 
 * decoupled from state management, business rules, or data access.
 */
import { useState } from "react";
import type { Transaction } from "../../../../../shared/types/userProfile";

interface TransactionListProps {
  transactions: Transaction[];
  onRemove: (id: number) => Promise<void>;
}

export function TransactionList({
  transactions,
  onRemove
}: TransactionListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleRemove = async (id: number) => {
    if (deletingId !== null) return;

    setDeletingId(id);

    try {
      await onRemove(id);
    } finally {
      setDeletingId(null);
    }
  };

  if (transactions.length === 0) {
    return <p>No transactions logged.</p>;
  }

  return (
    <ul className="transaction-list">
      {transactions.map((tx) => (
        <li key={tx.id} className="transaction-item">
          <span>
            {tx.date} — <strong>{tx.type}</strong>: ${tx.amount.toFixed(2)}
          </span>

          <button
            onClick={() => handleRemove(tx.id)}
            className="remove-btn"
            disabled={deletingId !== null}
          >
            {deletingId === tx.id ? "Deleting..." : "Clear Log"}
          </button>
        </li>
      ))}
    </ul>
  );
}
