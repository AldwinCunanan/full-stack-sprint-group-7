import { prisma } from "../db/prisma.ts";
import type { Teamsheet } from "../../../../shared/types/teamsheet_type";

type StoredTeamsheet = Omit<Teamsheet, "bettingTotal"> & { bettingTotal: { toNumber(): number } };

function toTeamsheet(teamsheet: StoredTeamsheet): Teamsheet {
    return { ...teamsheet, bettingTotal: teamsheet.bettingTotal.toNumber() };
}

export const teamsheetRepo = {
    
    async getAll(): Promise<Teamsheet[]> {
        const teamsheets = await prisma.teamsheet.findMany({
            orderBy: { id: "asc" },
            include: { racers: true },
        });
        return teamsheets.map(toTeamsheet);
    },

    async createTeamsheet(
        teamName: string,
        bettingTotal: number,
        racerIds: number[],
        userId: number,
    ): Promise<Teamsheet> {
        const teamsheet = await prisma.teamsheet.create({
            data: {
                teamName,
                bettingTotal,
                user: { connect: { id: userId } },
                racers: {
                    connect: racerIds.map((id) => ({ id }))
                }
            },
            include: { racers: true },
        });
        return toTeamsheet(teamsheet);
    },

    async deleteTeamsheet(id: string): Promise<Teamsheet> {
        const teamsheet = await prisma.teamsheet.delete({
            where: { id },
            include: { racers: true },
        });
        return toTeamsheet(teamsheet);
    }
};
