
import { TeamsheetList } from "../Racers/Racers";
import type { Teamsheet } from "../../../../../../shared/types/teamsheet_type";

type BettingProps = {
    teamsheets: Teamsheet[];
    deleteTeamsheet: (id: string) => Promise<void>;
};

function Betting({ teamsheets, deleteTeamsheet }: BettingProps) {
    return (
        <main>
            <TeamsheetList
                teamsheets={teamsheets}
                deleteTeamsheet={deleteTeamsheet}
            />
        </main>
    );
}

export default Betting;
