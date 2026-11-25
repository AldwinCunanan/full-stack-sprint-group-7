import { useState } from "react";
import type { Racer } from "../../../../shared/types/racer_type";
import type { Teamsheet } from "../../../../shared/types/teamsheet_type";
import { teamsheetService } from "../services/teamsheetService";

export function useTeamsheets(
    setTeamsheets: (teamsheets: Teamsheet[]) => void,
) {
    const [warning, setWarning] = useState("");
        async function createTeamsheet(
            teamName: string,
            selectedRacers: Racer[],
            bettingTotal: number
        ): Promise<boolean> {

            try {

                const updatedTeamsheets = await teamsheetService.create(
                    teamName,
                    selectedRacers,
                    bettingTotal
                );

                setTeamsheets(updatedTeamsheets);
                setWarning("");
                return true;
        } catch (error) {
            setWarning(
                error instanceof Error
                    ? error.message
                    : "Failed to create teamsheet"
            );

            return false;
        }
    }

    async function removeTeamsheet(id: string): Promise<void> {
        try {
            const updatedTeamsheets = await teamsheetService.delete(id);
            setTeamsheets(updatedTeamsheets);
            setWarning("");
        } catch (error) {
            setWarning(
                error instanceof Error
                    ? error.message
                    : "Failed to delete teamsheet"
            );
        }
    }

    return {
        warning,
        createTeamsheet,
        removeTeamsheet
    };
}
 

