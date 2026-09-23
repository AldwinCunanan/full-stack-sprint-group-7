import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/common/layout/Layout";
import UserProfile from "./components/pages/Userprofile/UserProfile"; 
import Racers from "./components/pages/Racers/Racers";
import RaceInfo from "./components/pages/Raceinfo/RaceInfo";


function App() {

  return (
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={<UserProfile />} />
          <Route path="racers" element={<Racers />} />
          <Route path="tracks" element={<RaceInfo />} />
          <Route path="bets" element={<Racers />} />
        </Route>  
      </Routes>
    );
}

export default App
