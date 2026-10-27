import { useWallet } from "../../../hooks/useWallet";
import { ProfileCard } from "../../../components/userProfile/ProfileCard";
import { WalletSection } from "../../../components/userProfile/WalletSection";
import { sampleProfiles } from "../../../data/sampleUserProfile";
import "./UserProfile.css";

export function UserProfile() {
  const wallet = useWallet();

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