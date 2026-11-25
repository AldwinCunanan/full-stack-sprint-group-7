import type { Department } from "../../../../shared/types/department";
import type {
    Racer,
    CreateRacerInput
} from "../../../../shared/types/racer";
import { racerRepo } from "../repositories/racersRepo";

type RacerResult =
    | { success: false; message: string }
    | { success: true; departments: Department[] };

export const racerService = {

    async getAll(): Promise<Department[]> {
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
    
    async createRacer(
        departmentName: string,
        racer: Omit<Racer, "id">
    ): Promise<RacerResult> {
        const departments = await racerRepo.getAll();

        const departmentExists = departments.some(
            (d) => d.name === departmentName
        );

        if (!departmentExists) {
            return {
                success: false,
                message: "Department does not exist"
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