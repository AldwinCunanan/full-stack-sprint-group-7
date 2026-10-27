import { Racer } from "../types/racer_type";
import { Teamsheet } from "../types/teamsheet_type";

let teamsheets: Teamsheet[] = [];

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

        teamsheets.push(newTeamsheet);

        return newTeamsheet;
    },

    getTeamsheets(): Teamsheet[] {
        return teamsheets;
    },

    getTeamsheet(teamName: string): Teamsheet | undefined {
        return teamsheets.find(
            (teamsheet) => teamsheet.teamName === teamName
        );
    },

    deleteTeamsheet(id:string): void {
        teamsheets = teamsheets.filter(
            (teamsheet) => teamsheet.id !== id
        )
    }
};