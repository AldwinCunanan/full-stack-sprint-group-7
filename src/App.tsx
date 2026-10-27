import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/common/layout/Layout";
import UserProfile from "./components/pages/Userprofile/UserProfile";
import Racers from "./components/pages/Racers/Racers";
import { Teamsheet } from "./types/teamsheet_type";
import Betting from "./components/pages/Betting/Betting";
import Races from "./components/pages/Races/Races";
import { useWallet } from "./hooks/useWallet";

function App() {
  const wallet = useWallet();
  const [teamsheets, setTeamsheets] = useState<Teamsheet[]>([]);
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
        <Route path="/" element={<Layout credits={wallet.credits}/>}> 
          <Route index element={<UserProfile wallet={wallet}/>} />
          <Route path="racers" element={
            <Racers 
              teamsheets={teamsheets}
              addTeamsheet={addTeamsheet}
              deleteTeamsheet={deleteTeamsheet}/>} />
          <Route path="tracks" element={<Races />} />
          <Route path="bets" element={
            <Betting
             teamsheets={teamsheets}
             deleteTeamsheet={deleteTeamsheet}/>} />
        </Route>  
      </Routes>
    );
}

export default App
