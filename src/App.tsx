import Landing  from "./components/pages/Racers/Racers";
import UserProfile from "./components/pages/Userprofile/UserProfile"; 
import Racers from "./components/pages/Racers/Racers";
import RaceInfoHeader from "./components/pages/Raceinfo/RaceInfoHeader";
import RaceInfoMain from "./components/pages/Raceinfo/RaceInfo";

import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/common/layout/Layout";

function App() {

  return (

      <Routes>
        <Route path="/" element={<UserProfile />}> 
          <Route index element={<Racers />} />
          <Route path="employees" element={<Landing />} />
          <Route path="organization" element={<Organization />} />
        </Route>  
      </Routes>
    );
}

export default App
