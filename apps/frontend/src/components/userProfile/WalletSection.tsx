/**
 * Sprint 3 Architectural Note:
 * Part of the View layer. Integrates the `useWallet` hook state to coordinate 
 * wallet operations (deposits, withdrawals) and transaction history, keeping 
 * validation logic in `walletService` and storage in `transactionRepo`.
 */

import { useState } from "react";
import { WalletForm } from "./WalletForm";
import { TransactionList } from "./TransactionList";
import type { useWallet } from "../../hooks/useWallet";

interface WalletSectionProps {
  wallet: ReturnType<typeof useWallet>;
}

export function WalletSection({ wallet }: WalletSectionProps) {
  const {
    credits,
    transactions,
    errorMsg,
    loading,
    deposit,
    withdraw,
    removeTransaction
  } = wallet;

  const [activeAction, setActiveAction] = useState<"deposit" | "withdraw" | null>(null);

  return (
    <div className="wallet-section-container">

      {/* Current Wallet Balance */}
      <div className="wallet-balance">
        <h3>Available Credits</h3>
        {loading ? (
          <p>Loading balance...</p>
        ) : (
          <p>${credits.toFixed(2)}</p>
        )}
      </div>

      {/* Wallet Action Trigger Buttons */}
      <div className="wallet-action">
        <button onClick={() => setActiveAction("deposit")}>
          Deposit Funds
        </button>

        <button onClick={() => setActiveAction("withdraw")}>
          Withdraw Funds
        </button>
      </div>

      {/* Wallet Action Form */}
      {activeAction && (
        <WalletForm
          activeAction={activeAction}
          onDeposit={async (amt) => {
            const ok = await deposit(amt);
            if (ok) setActiveAction(null);
            return ok;
          }}
          onWithdraw={async (amt) => {
            const ok = await withdraw(amt);
            if (ok) setActiveAction(null);
            return ok;
          }}
          onCancel={() => setActiveAction(null)}
          errorMsg={errorMsg}
        />
      )}

      {/* Transaction History Section */}
      <div className="transaction-history">
        <h3>Transaction History</h3>

        {loading ? (
          <p>Loading transactions...</p>
        ) : (
          <TransactionList
            transactions={transactions}
            onRemove={removeTransaction}
          />
        )}
      </div>

    </div>
  );
}
