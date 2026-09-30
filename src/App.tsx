import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/common/layout/Layout";
import UserProfile from "./components/pages/Userprofile/UserProfile"; 
import Racers from "./components/pages/Racers/Racers";
import Betting from "./components/pages/Betting/Betting";
import Races from "./components/pages/Races/Races";
import { races } from "./backend/data/racesData";
import type { Race } from "./backend/types/races";
import { useState } from "react";


function App() {
  const [raceData, setRaceData] = useState<Race[]>(races)

  return (
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={<UserProfile />} />
          <Route path="racers" element={<Racers />} />
          <Route path="tracks" element={<Races races={raceData} updateRaces={setRaceData}/>} />
          <Route path="bets" element={<Betting />} />
        </Route>  
      </Routes>
    );
}

export default App
