import { useState } from "react";
import { Racer } from "../types/racer_type";
import { Teamsheet } from "../types/teamsheet_type";
import { racerService } from "../services/racerService"

export function useTeamsheets(
    addTeamsheet: (teamsheet: Teamsheet) => void,
    deleteTeamsheet: (id: string) => void  
) {
    const [warning, setWarning] = useState("");

    function createTeamsheet(
        teamName: string,
        selectedRacers: Racer[],
        bettingTotal: number
    ): boolean {
        const result = racerService.createTeamsheet(
            crypto.randomUUID(),
            teamName,
            selectedRacers,
            bettingTotal
        );

        if (!result.success) {
            setWarning(result.message);
            return false;
        }

        addTeamsheet(result.teamsheet);
        setWarning("");
        return true;
    }

    function removeTeamsheet(id: string): void {
        deleteTeamsheet(id);
    }

    return {
        warning,
        createTeamsheet,
        removeTeamsheet
    };
} 

