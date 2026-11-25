import { racerRepo } from "../repositories/racersRepo.ts";
import type { Racer } from "../../../../shared/types/racer_type";

export const racerService = {
    async getAll(): Promise<Racer[]> {
        return racerRepo.getAll()
    }
}