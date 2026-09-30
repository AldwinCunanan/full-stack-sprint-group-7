import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/common/layout/Layout";
import UserProfile from "./components/pages/Userprofile/UserProfile"; 
import Racers, { Teamsheet } from "./components/pages/Racers/Racers";
import RaceInfo from "./components/pages/Raceinfo/RaceInfo";
import Betting from "./components/pages/Betting/Betting";


function App() {
  const [teamsheets, setTeamsheets] = useState<Teamsheet[]>([]);
  const [credits, setCredits] = useState<number>(1000);

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
        <Route path="/" element={<Layout />}> 
          <Route index element={<UserProfile credits={credits} setCredits={setCredits} />} />
          <Route path="racers" element={
            <Racers 
              teamsheets={teamsheets}
              addTeamsheet={addTeamsheet}
              deleteTeamsheet={deleteTeamsheet}/>} />
          <Route path="tracks" element={<RaceInfo />} />
          <Route path="bets" element={
            <Betting
             teamsheets={teamsheets}
             deleteTeamsheet={deleteTeamsheet}/>} />
        </Route>  
      </Routes>
    );
}

export default App
