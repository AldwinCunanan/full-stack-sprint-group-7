import "./UserProfile.css"
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

export function UserProfile() {
    return (
        <section className="user-profile">
            <h2>User Profile</h2>
            <ProfileList profiles={mockProfile}/>
        </section>
    );
}

function ProfileList({profiles}: {profiles: ProfileData[] }){
    const profileCards: JSX.Element[] = []; // prevents raw data types from being entered

    profiles.forEach((profile) => {
        profileCards.push(
            <UserProfileCard profile={profile} key = {profile.id} />
        );
    });
    return <div className="profile-list">{profileCards}</div>
}

export function UserProfileCard ({ profile }: {profile :ProfileData }) {
    return (
        <div className="profile-card">
            <h3>{profile.username}'s Profile</h3>
            <ul>
                <li><strong>Date of Birth:</strong> {profile.dob}</li>
                <li><strong>Favorite Racer:</strong> {profile.favoriteRacer}</li>
                <li><strong>Favorite Track:</strong> {profile.favoriteTrack}</li>
                <li><strong>Available Credits:</strong> ${profile.credits}</li>
                <li><strong>Total Profit/Loss:</strong> +{profile.totalProfit}</li>
                <li><strong>Active Bets:</strong> {profile.bettingStats.activeBets}</li>
                <li><strong>Won Bets:</strong> {profile.bettingStats.wonBets}</li>
                <li><strong>Total Bets Placed:</strong> {profile.bettingStats.totalBets}</li>
            </ul>
        </div>
    )
}


export default UserProfile;