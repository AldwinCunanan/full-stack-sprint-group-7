/**
 * Sprint 3 Architectural Note:
 * Presentational Form component (View layer). Captures user input for deposits or 
 * withdrawals and safely delegates execution upward to the hook/service layers.
 */
import { useState } from "react";

interface WalletFormProps {
  activeAction: "deposit" | "withdraw";
  onDeposit: (amount: string) => Promise<boolean>;
  onWithdraw: (amount: string) => Promise<boolean>;
  onCancel: () => void;
  errorMsg?: string;
}

export function WalletForm({
  activeAction,
  onDeposit,
  onWithdraw,
  onCancel,
  errorMsg
}: WalletFormProps) {
  const [amountInput, setAmountInput] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);

    try {
      let success = false;

      if (activeAction === "deposit") {
        success = await onDeposit(amountInput);
      } else {
        success = await onWithdraw(amountInput);
      }

      if (success) {
        setAmountInput("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="wallet-form">
      <h3>
        {activeAction === "deposit"
          ? "Deposit Credits"
          : "Withdraw Credits"}
      </h3>

      <div className="form-group">
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={amountInput}
          onChange={(e) => setAmountInput(e.target.value)}
          placeholder="Enter amount..."
          required
          disabled={submitting}
        />

        <button type="submit" disabled={submitting}>
          {submitting
            ? "Processing..."
            : `Confirm ${activeAction}`}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>

      {errorMsg && (
        <p className="error-message">{errorMsg}</p>
      )}
    </form>
  );
}
