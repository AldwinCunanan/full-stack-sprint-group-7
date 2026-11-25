import { prisma } from "../db/prisma.ts";
import type { Teamsheet } from "../../../../shared/types/teamsheet_type";

export const teamsheetRepo = {
    
    async getAll(): Promise<Teamsheet[]> {
    return prisma.teamsheet.findMany({
                orderBy: { id: "asc" },
                include: { racers: true }
        });
    },

    async createTeamsheet(
        teamName: string,
        bettingTotal: number,
        racerIds: number[]
    ): Promise<Teamsheet> {
        return prisma.teamsheet.create({
            data: {
                teamName,
                bettingTotal,
                racers: {
                    connect: racerIds.map((id) => ({ id }))
                }
            },
            include: { racers: true }
        });
    },

    async deleteTeamsheet(id: string): Promise<Teamsheet> {
        return prisma.teamsheet.delete({
            where: { id },
            include: { racers:true }
        })
    }
};