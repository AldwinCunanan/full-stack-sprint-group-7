import type { Racer } from "../../../../shared/types/racer";
import { prisma } from "../db/prisma";
import type { Department } from "../../../../shared/types/department";

export const racerRepo = {
    
    async getAll(): Promise<Department[]> {
    return prisma.department.findMany({
        orderBy: { id: "asc" },
        include: { racers: true }
        });
    },

    async createRacer(
        departmentName: string,
        racer: Omit<Racer, "id">
    ): Promise<Racer> {
        return prisma.racer.create({
            data: {
                firstName: racer.firstName,
                lastName: racer.lastName,
                department: {
                    connect: { name: departmentName}
                }
            }
        });
    },

    async getRacers(
        departmentName: string
    ): Promise<Racer[]> {
        const department = await prisma.department.findUnique({
            where: { name: departmentName },
            include: { racers: true }
        });

        return department?.racers ?? [];
    }
};