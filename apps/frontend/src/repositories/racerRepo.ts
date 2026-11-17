import { Racer } from "../types/racer_type";
import { Teamsheet } from "../types/teamsheet_type";

// What does this repository do?
// - it handles the main method createTeamsheet()
// - takes teamsheet ID, selected racers, betting total, and builds an object using the Teamsheet type
// - handles the final step of actually making 

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