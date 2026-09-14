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

const mockProfile: ProfileData[] = [{
    id: 1,
    username: "SpeedRace67",
    dob: "2000-05-29",
    favoriteRacer: "Max Velocity",
    favoriteTrack: "Silverstone Circuit",
    credits: 1000,
    totalProfit: 250,
    bettingStats: {
        activeBets: 2,
        wonBets: 6,
        totalBets: 10
    }
}]