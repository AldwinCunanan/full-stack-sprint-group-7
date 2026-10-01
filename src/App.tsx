import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/common/layout/Layout";
import UserProfile from "./components/pages/Userprofile/UserProfile";
import Racers, { Teamsheet } from "./components/pages/Racers/Racers";
import Betting from "./components/pages/Betting/Betting";
import { Transaction } from "./components/pages/Userprofile/UserProfile";
import Races from "./components/pages/Races/Races";
import { races } from "./backend/data/racesData";
import type { Race } from "./backend/types/races";


function App() {
  const [raceData, setRaceData] = useState<Race[]>(races)
  const [teamsheets, setTeamsheets] = useState<Teamsheet[]>([]);
  const [credits, setCredits] = useState<number>(1000);
  const [transactions, setTransactions] = useState<Transaction[]>([{
          id: 1, type:"Deposit", amount: 1000, date: "2026-09-30"
      },
      ]);

  const addTeamsheet = (newTeamsheet: Teamsheet) => {
    setTeamsheets(prev => [
        ...prev,
        newTeamsheet
    ]);
  };
  const deleteTeamsheet = (id: string) => {
  setTeamsheets(prev =>
      prev.filter(
          teamsheet => teamsheet.id !== id
      )
  );
  };
  return (
      <Routes>
        <Route path="/" element={<Layout credits={credits}/>}> 
          <Route index element={<UserProfile credits={credits} setCredits={setCredits} 
                                            transactions={transactions} setTransactions={setTransactions}/>} />
          <Route path="racers" element={
            <Racers 
              teamsheets={teamsheets}
              addTeamsheet={addTeamsheet}
              deleteTeamsheet={deleteTeamsheet}/>} />
          <Route path="tracks" element={<Races races={raceData} updateRaces={setRaceData}/>} />
          <Route path="bets" element={
            <Betting
             teamsheets={teamsheets}
             deleteTeamsheet={deleteTeamsheet}/>} />
        </Route>  
      </Routes>
    );
}

export default App
