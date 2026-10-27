import { Transaction } from "../../types/userProfile";

interface TransactionListProps {
  transactions: Transaction[];
  onRemove: (id: number) => void;
}

export function TransactionList({ transactions, onRemove }: TransactionListProps) {
  if (transactions.length === 0) {
    return <p>No transaction logged.</p>;
  }

  return (
    <ul className="transaction-list">
      {transactions.map((tx) => (
        <li key={tx.id} className="transaction-item">
          <span>
            {tx.date} — <strong>{tx.type}</strong>: ${tx.amount.toFixed(2)}
          </span>
          <button onClick={() => onRemove(tx.id)} className="remove-btn">
            Clear Log
          </button>
        </li>
      ))}
    </ul>
  );
}