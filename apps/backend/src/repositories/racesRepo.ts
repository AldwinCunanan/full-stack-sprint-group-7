import { prisma } from "../db/prisma.ts";
import type { Race } from "../../../../shared/types/races";
import type { RaceInput } from "../../../../shared/types/races";

export const racesRepo = {
    /**
    * Retrieves all races ordered by name.
    */
    async getAllRaces(): Promise<Race[]> {
        return prisma.race.findMany({
            orderBy: { name: "asc" },
        });
    },

    /**
    * Retrieves a single race by id.
    * @param Id The id of the race to find.
    * @returns The matching race, or undefined if none exists.
    */
    async getRace(selectedId:string): Promise<Race | undefined> {
        const race = await prisma.race.findUnique({
            where: { id: selectedId},
        });

        return race ?? undefined;
    },

    /**
    * Creates a new race and adds it to the raceData.
    * @param raceInput The race details.
    * @returns The newly created race.
    */
    async createRace(raceInput:RaceInput): Promise<Race> {
        return prisma.race.create({
            data: {
                name: raceInput.name,
                location: raceInput.location,
                trackLength: raceInput.trackLength,
                trackImg: raceInput.trackImg,
                date: raceInput.date,
                drivers: raceInput.drivers
            }
        })
    },

    /**
    * Removes a race by id.
    * @param raceId The id of the race to remove.
    */
    async deleteRace(raceId: string): Promise<void> {
        if (!raceId) return;

        await prisma.race.deleteMany({ where: { id: raceId } });
    },
}
