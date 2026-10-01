import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/common/layout/Layout";
import UserProfile from "./components/pages/Userprofile/UserProfile"; 
import Racers from "./components/pages/Racers/Racers";
import Racers, { Teamsheet } from "./components/pages/Racers/Racers";
import RaceInfo from "./components/pages/Raceinfo/RaceInfo";
import Betting from "./components/pages/Betting/Betting";
import Races from "./components/pages/Races/Races";
import { races } from "./backend/data/racesData";
import type { Race } from "./backend/types/races";
import { useState } from "react";


function App() {
  const [raceData, setRaceData] = useState<Race[]>(races)
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
        <Route path="/" element={<Layout />}> 
          <Route index element={<UserProfile />} />
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
