import { Transaction } from "../types/userProfile"; 

export const sampleTransactions: Transaction[] = [
  { id: 1, type: "Deposit", amount: 150.00, date: "2026-05-01" },
  { id: 2, type: "Deposit", amount: 50.00, date: "2026-05-03" },
  { id: 3, type: "Withdrawal", amount: 20.00, date: "2026-05-04" },
  { id: 4, type: "Deposit", amount: 100.00, date: "2026-05-05" },
  { id: 5, type: "Withdrawal", amount: 45.00, date: "2026-05-08" },
  { id: 6, type: "Deposit", amount: 200.00, date: "2026-05-10" },
  { id: 7, type: "Withdrawal", amount: 75.00, date: "2026-05-12" },
  { id: 8, type: "Deposit", amount: 50.00, date: "2026-05-15" },
  { id: 9, type: "Withdrawal", amount: 10.00, date: "2026-05-18" },
  { id: 10, type: "Deposit", amount: 300.00, date: "2026-05-20" }
];