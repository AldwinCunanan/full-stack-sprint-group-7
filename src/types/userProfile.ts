export interface Transaction {
    id: number;
    type: "Deposit" | "Withdrawal";
    amount: number;
    date: string;
}

export interface UserProfileProps {
    credits: number;
    setCredits: React.Dispatch<React.SetStateAction<number>>;
    transactions: Transaction[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export interface ProfileData {
    id: number;
    username: string;
    dob: string;
    favoriteRacer: string;
    favoriteTrack: string;
    credits: number;
    totalProfit: number;
    bettingStats: {
        activeBets: number;
        wonBets: number;
        totalBets: number;
    }
}