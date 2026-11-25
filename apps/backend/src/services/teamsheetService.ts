import type { Teamsheet } from "../../../../shared/types/teamsheet_type";
import type { Racer } from "../../../../shared/types/racer_type";
import { teamsheetRepo } from "../repositories/teamsheetRepo";

export const teamsheetService = {

    async getAll(): Promise<Teamsheet[]> {
        return teamsheetRepo.getAll();
    },

    async createTeamsheet(
        teamName: string,
        selectedRacers: Racer[],
        bettingTotal: number
    ): Promise<Teamsheet> {
        const racerIds = selectedRacers.map((racer) => racer.id);

        return teamsheetRepo.createTeamsheet(
            teamName,
            bettingTotal,
            racerIds
        );
    },


    async deleteTeamsheet(id: string): Promise<Teamsheet> {
        return teamsheetRepo.deleteTeamsheet(id);
    }
};