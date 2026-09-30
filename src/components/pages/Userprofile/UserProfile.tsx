import React, { useState } from 'react';
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

export interface Transaction {
    id: number;
    type: "Deposit" | "Withdrawal";
    amount: number;
    date: string;
}

interface UserProfileProps {
    credits: number;
    setCredits: React.Dispatch<React.SetStateAction<number>>;
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

export function UserProfile({ credits, setCredits }: UserProfileProps) {

    // Local state for toggling the form visibility and handling form inputs
    const [activeAction, setActiveAction] = useState<"deposit" | "withdraw" | null>(null);
    const [amountInput, setAmountInput] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");

    // Add remove transaction history
    const [transactions, setTransactions] = useState<Transaction[]>([{
        id: 1, type:"Deposit", amount: 1000, date: "2026-09-30"
    },
    ]);

    const handleTransactionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numAmount = Number(amountInput);

        // Validation Checks
        if (isNaN(numAmount) || numAmount <=0) {
            setErrorMsg("Please enter a valid amount.");
            return;
        }
        if (activeAction === "withdraw" && numAmount > credits){
            setErrorMsg("Insufficient funds! You cannot withdraw more than you available credit")
            return
        }

        // Shared top-level credits state
        const updatedCredits = activeAction ==="deposit" ? credits + numAmount : credits - numAmount;
        setCredits(updatedCredits)

        // Dynamic Element Addition
        const newTx: Transaction = {
            id: Date.now(),
            type: activeAction === "deposit" ? "Deposit" : "Withdrawal",
            amount: numAmount,
            date: new Date().toLocaleDateString(),
        };
        setTransactions([newTx, ...transactions]);

        // Form reset
        setAmountInput("");
        setErrorMsg("");
        setActiveAction(null);
    };

    return (
        <section className="user-profile">
            <h2>User Profile</h2>
            <ProfileList profiles={mockProfile} currentCredits={credits}/>

            <div className="wallet-action">
                <button
                    onClick={() => {
                    setActiveAction("deposit");
                    setErrorMsg("");
    }}
                    >Deposit Funds</button>
                <button
                    onClick={() => {
                        setActiveAction("withdraw");
                        setErrorMsg("");
                    }}>Withdraw Funds</button>
            </div>

        // Form component
        {activeAction && (
            <form onSubmit={handleTransactionSubmit} className="wallet-form">
                <h3>{activeAction === "deposit" ? "Deposit Credits" : "Withdraw Credits"}</h3>
                <div className="form-group">
                    <input 
                        type="number"
                        value={amountInput}
                        onChange={(e) => setAmountInput(e.target.value)}
                        placeholder="Enter amount..." />
                    <button type="submit">Confirm{activeAction}</button>
                    <button type="button" onClick={()=> setActiveAction(null)}>Cancel</button>
                </div>
                {errorMsg && <p className="error-message">{errorMsg}</p>}
            </form>
        )}
        
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