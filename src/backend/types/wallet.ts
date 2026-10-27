export interface Transaction {
    id: number;
    type: "Deposit" | "Withdrawal";
    amount: number;
    date: string;
}