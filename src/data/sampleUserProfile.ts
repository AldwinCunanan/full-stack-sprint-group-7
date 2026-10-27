import { ProfileData } from "../types/userProfile";

export const sampleProfiles: ProfileData[] = [
  {
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
      totalBets: 10,
    },
  },
];