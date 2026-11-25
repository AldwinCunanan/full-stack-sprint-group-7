import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/common/layout/Layout";
import UserProfile from "./components/pages/Userprofile/UserProfile";
import Racers from "./components/pages/Racers/Racers";
import type { Teamsheet } from "../../../shared/types/teamsheet_type";
import Betting from "./components/pages/Betting/Betting";
import Races from "./components/pages/Races/Races";
import { useWallet } from "./hooks/useWallet";
import { useTeamsheets } from "./hooks/useTeamsheet";

function App() {
  const wallet = useWallet();
  const [teamsheets, setTeamsheets] = useState<Teamsheet[]>([]);

  const {
      warning,
      createTeamsheet,
      removeTeamsheet
  } = useTeamsheets(setTeamsheets);
      return (
        <Routes>
            <Route path="/" element={<Layout credits={wallet.credits}/>}>
                <Route index element={<UserProfile wallet={wallet}/>} />

                <Route path="racers" element={
                    <Racers
                        teamsheets={teamsheets}
                        createTeamsheet={createTeamsheet}
                        deleteTeamsheet={removeTeamsheet}
                        warning={warning}
                    />
                } />

                <Route path="tracks" element={<Races />} />

                <Route path="bets" element={
                    <Betting
                        teamsheets={teamsheets}
                        deleteTeamsheet={removeTeamsheet}
                    />
                } />
            </Route>
        </Routes>
    );
}

export default App
