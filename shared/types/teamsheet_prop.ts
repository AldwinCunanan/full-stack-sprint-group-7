import { Racer } from "./racer_type";

export type AddTeamsheetProps = {
    createTeamsheet: (
        teamName: string,
        selectedRacer: Racer[],
        bettingTotal: number
    ) => boolean;
    warning: string;
};