import type { TeamsheetProp } from "../../../../shared/types/teamsheet_prop";
import type {
    Racer,
    CreateRacerInput
} from "../../../../shared/types/racer";
import { racerRepo } from "../repositories/racersRepo";

type RacerResult =
    | { success: false; message: string }
    | { success: true; departments: TeamsheetProp[] };

export const racerService = {

    async getAll(): Promise<TeamsheetProp[]> {
        return racerRepo.getAll();
    },

    async add(input: CreateRacerInput): Promise<RacerResult> {
        const racer = {
            firstName: input.firstName,
            lastName: input.lastName
        };

        return this.createRacer(
            input.departmentName,
            racer
        );
    },
    
    async createTeamsheet(
        teamName: string,
        selectedRacer: Omit<Racer, "id">,
        bettingTotal: number
    ): Promise<RacerResult> {
        const departments = await racerRepo.getAll();

        const teamsheetExists = departments.some(
            (d) => d.name === teamName
        );

        if (!teamsheetExists) {
            return {
                success: false,
                message: "Teamsheet does not exist"
            };
        }

        if (racer.firstName.trim().length < 3) {
            return {
                success: false,
                message: "First name must be at least 3 characters",
            };
        }

        await racerRepo.createRacer(departmentName, racer);

        return {
            success: true,
            departments: await racerRepo.getAll()
        };
    },

    async getRacers(departmentName: string): Promise<Racer[]> {
        return racerRepo.getRacers(departmentName);
    }
}