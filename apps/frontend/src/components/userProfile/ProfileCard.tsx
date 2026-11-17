/**
 * Architectural Note:
 * Presentational component (View layer) that receives profile information and live credit state
 * via props to render user details. Keeps UI logic purely declarative.
 */
import { ProfileData } from "../../types/userProfile";

interface ProfileCardProps {
  profile: ProfileData;
  currentCredits: number;
}

export function ProfileCard({ profile, currentCredits }: ProfileCardProps) {
  return (
    <div className="profile-card">
      <h3>{profile.username}'s Profile</h3>
      <ul>
        <li><strong>Date of Birth:</strong> {profile.dob}</li>
        <li><strong>Favorite Racer:</strong> {profile.favoriteRacer}</li>
        <li><strong>Favorite Track:</strong> {profile.favoriteTrack}</li>
        <li><strong>Available Credits:</strong> ${currentCredits.toFixed(2)}</li>
        <li><strong>Total Profit/Loss:</strong> +{profile.totalProfit}</li>
        <li><strong>Active Bets:</strong> {profile.bettingStats.activeBets}</li>
        <li><strong>Won Bets:</strong> {profile.bettingStats.wonBets}</li>
        <li><strong>Total Bets Placed:</strong> {profile.bettingStats.totalBets}</li>
      </ul>
    </div>
  );
}