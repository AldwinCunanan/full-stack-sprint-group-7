/**
 * Sprint 3 Architectural Note:
 * Part of the View layer. Integrates the `useWallet` hook state to coordinate 
 * wallet operations (deposits, withdrawals) and transaction history, keeping 
 * validation logic in `walletService` and storage in `transactionRepo`.
 */
import { useState } from "react";
import { WalletForm } from "./WalletForm";
import { TransactionList } from "./TransactionList";

// Type definition matching the return value of your useWallet hook
interface WalletSectionProps {
  wallet: ReturnType<typeof import("../../hooks/useWallet").useWallet>;
}

export function WalletSection({ wallet }: WalletSectionProps) {
  const { transactions, errorMsg, deposit, withdraw, removeTransaction } = wallet;
  const [activeAction, setActiveAction] = useState<"deposit" | "withdraw" | null>(null);

  return (
    <div className="wallet-section-container">
      {/* Wallet Action Trigger Buttons */}
      <div className="wallet-action">
        <button onClick={() => setActiveAction("deposit")}>Deposit Funds</button>
        <button onClick={() => setActiveAction("withdraw")}>Withdraw Funds</button>
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
        <TransactionList 
          transactions={transactions} 
          onRemove={removeTransaction} 
        />
      </div>
    </div>
  );
}