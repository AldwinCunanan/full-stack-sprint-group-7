import { Teamsheet } from "../types/teamsheet_type";
import { racerRepo } from "../repositories/racerRepo";
import { Racer } from "../types/racer_type";

type racerResult =
    | { success: false; message: string }
    | { success: true; teamsheet: Teamsheet };

export const racerService = {
    createTeamsheet(
    id: string,
    teamName: string,
    selectedRacer: Racer[],
    bettingTotal: number
    ): racerResult {

        if (teamName.trim().length < 3 ) {
            return {
                success: false,
                message: "Team name must be at least 3 characters long"
            };
        }

        if (selectedRacer.length === 0) {
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

        const teamsheet = racerRepo.createTeamsheet(
            id,
            teamName.trim(),
            selectedRacer,
            bettingTotal
        )

        return {
            success: true,
            teamsheet: teamsheet
        };
    },
}