import type { Racer } from "../../../../shared/types/racer_type";
import { prisma } from "../db/prisma";

export const racerRepo = {
    async getAll(): Promise<Racer[]> {
        return prisma.racer.findMany({
            orderBy: { id: "asc"}
        });
    }
};