interface ProfileData {
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
