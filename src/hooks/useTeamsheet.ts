import { useState } from "react";
import { Racer } from "../types/racer_type";
import { Teamsheet } from "../types/teamsheet_type";
import { racerService } from "../services/racerService"

// What does this hook do?
// - keeps track of warning messages using useState
// - calles racerService to try to make a new teamsheet
// - should validation fail, displays a warning message 
// - coordinates overall teamsheet creeation process
// - if it succeeds it passes the new teamsheet to App.tsx with a callback
// - also has a functions to request deletion 

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

