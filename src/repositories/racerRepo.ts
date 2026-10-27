import { Racer } from "../types/racer_type";
import { Teamsheet } from "../types/teamsheet_type";

export const racerRepo = {
    createTeamsheet(
        id: string,
        teamName: string,
        selectedRacer: Racer[],
        bettingTotal: number
    ): Teamsheet {
        const newTeamsheet: Teamsheet = {
            id: id,
            teamName: teamName,
            racers: selectedRacer,
            bettingTotal: bettingTotal
        };
        
        return newTeamsheet;
    },
};