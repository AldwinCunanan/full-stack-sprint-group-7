import {TeamsheetList,Teamsheet} from "../Racers/Racers";

type BettingProps = {
    teamsheets: Teamsheet[];
    deleteTeamsheet: (id: string) => void;
};

function Betting({teamsheets,deleteTeamsheet}: BettingProps) {
    return (
        <main>
            {/* When we want to add new stuff */}

            <TeamsheetList
                teamsheets={teamsheets}
                deleteTeamsheet={deleteTeamsheet}
            />
        </main>
    );
}

export default Betting;

