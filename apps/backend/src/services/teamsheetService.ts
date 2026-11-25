import type { Teamsheet } from "../../../../shared/types/teamsheet_type";
import type { Racer } from "../../../../shared/types/racer_type";
import { teamsheetRepo } from "../repositories/teamsheetRepo";
import { racerRepo } from "../repositories/racersRepo";

type TeamsheetResult =
    | { success: false; message: string }
    | { success: true; teamsheets: Teamsheet[] };

export const teamsheetService = {

    async getAll(): Promise<Teamsheet[]> {
        return teamsheetRepo.getAll();
    },

    async createTeamsheet(
        teamName: string,
        selectedRacers: Racer[],
        bettingTotal: number
    ): Promise<TeamsheetResult> {

        if (teamName.trim().length < 3 ) {
            return {
                success: false,
                message: "Team name must be at least 3 characters long"
            };
        }

        if (selectedRacers.length === 0) {
            return {
                success: false,
                message: "You must select at least one racer"
            };
        }

        if (bettingTotal <= 0) {
            return {
                success: false,
                message: "Betting total must be greater than $0"
            };
        }

        const availableRacers = await racerRepo.getAll();

        const availableIds = new Set(
            availableRacers.map((racer) => racer.id)
        );

        const validRacers = selectedRacers.every(
            (racer) => availableIds.has(racer.id)
        );

        if (!validRacers) {
            return {
                success: false,
                message: "One or more selected racers do not exist"
            };
        }

        const racerIds = selectedRacers.map(
            (racer) => racer.id
        );

        await teamsheetRepo.createTeamsheet(
            teamName.trim(),
            bettingTotal,
            racerIds
        );

        return {
            success: true,
            teamsheets: await teamsheetRepo.getAll()
        }
    },


    async deleteTeamsheet(id: string): Promise<TeamsheetResult> {
        await teamsheetRepo.deleteTeamsheet(id);

        return {
            success: true,
            teamsheets: await teamsheetRepo.getAll()
             
        }
    }
};