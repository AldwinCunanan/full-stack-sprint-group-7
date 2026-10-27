import React, { useState } from "react";

interface WalletFormProps {
  activeAction: "deposit" | "withdraw";
  onDeposit: (amount: string) => Promise<boolean>;
  onWithdraw: (amount: string) => Promise<boolean>;
  onCancel: () => void;
  errorMsg?: string;
}

export function WalletForm({ activeAction, onDeposit, onWithdraw, onCancel, errorMsg }: WalletFormProps) {
  const [amountInput, setAmountInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;
    
    if (activeAction === "deposit") {
      success = await onDeposit(amountInput);
    } else {
      success = await onWithdraw(amountInput);
    }

    if (success) {
      setAmountInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="wallet-form">
      <h3>{activeAction === "deposit" ? "Deposit Credits" : "Withdraw Credits"}</h3>
      <div className="form-group">
        <input
          type="number"
          value={amountInput}
          onChange={(e) => setAmountInput(e.target.value)}
          placeholder="Enter amount..."
        />
        <button type="submit">Confirm {activeAction}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </form>
  );
}