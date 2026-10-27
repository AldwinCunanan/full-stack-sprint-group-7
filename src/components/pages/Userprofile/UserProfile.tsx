/**
 * Sprint 3 Architectural Note (Requirement I.3):
 * 
 * Why this is set up this way:
 * We're using a clean Repository-Service-Hook-View architecture here. 
 * By keeping business logic and state out of the UI components, this file 
 * stays clean, easy to read, and simple to test.
 * 
 * How data and logic flow through here:
 * 1. View: This component (`UserProfile`) and `WalletSection` handle what the user sees and does.
 * 2. Hook: `useWallet` manages the live state (like credits and transaction history).
 * 3. Service: `walletService` runs all the safety checks and rules (no negative deposits, etc.).
 * 4. Repository: `transactionRepo` handles saving and loading the mock data.
 */
import { useWallet } from "../../../hooks/useWallet";
import { ProfileCard } from "../../../components/userProfile/ProfileCard";
import { WalletSection } from "../../../components/userProfile/WalletSection";
import { sampleProfiles } from "../../../data/sampleUserProfile";
import "./UserProfile.css";

interface UserProfileProps {
  wallet: ReturnType<typeof useWallet>;
}

export function UserProfile({ wallet }: UserProfileProps) {
  return (
    <section className="user-profile-page">
      <h2>User Profile & Wallet</h2>
      
      {/* Profile Info Display (Using live credits from wallet hook) */}
      <div className="profile-list">
        {sampleProfiles.map((profile) => (
          <ProfileCard 
            key={profile.id} 
            profile={profile} 
            currentCredits={wallet.credits} 
          />
        ))}
      </div>

      {/* Extracted Wallet Management Section */}
      <WalletSection wallet={wallet} />
    </section>
  );
}

export default UserProfile;