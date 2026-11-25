import { prisma } from "../db/prisma.ts";
import type { Race, RaceInput } from "../../../../shared/types/races";

type RaceWithDrivers = Omit<Race, "drivers"> & { drivers: { name: string }[] };

const raceRelations = { drivers: { select: { name: true } } } as const;

function toRace(race: RaceWithDrivers): Race {
    return { ...race, drivers: race.drivers.map(({ name }) => name) };
}

export const racesRepo = {
    /**
    * Retrieves all races ordered by name.
    */
    async getAllRaces(): Promise<Race[]> {
        const races = await prisma.race.findMany({
            orderBy: { name: "asc" },
            include: raceRelations,
        });
        return races.map(toRace);
    },

    /**
    * Retrieves a single race by id.
    * @param selectedId The id of the race to find.
    * @returns The matching race, or undefined if none exists.
    */
    async getRace(selectedId: string): Promise<Race | undefined> {
        const race = await prisma.race.findUnique({
            where: { id: selectedId },
            include: raceRelations,
        });

        return race ? toRace(race) : undefined;
    },

    /**
    * Creates a new race and links its drivers by name.
    * @param raceInput The race details.
    * @returns The newly created race.
    */
    async createRace(raceInput: RaceInput): Promise<Race> {
        const race = await prisma.race.create({
            data: {
                name: raceInput.name,
                location: raceInput.location,
                trackLength: raceInput.trackLength,
                trackImg: raceInput.trackImg,
                date: raceInput.date,
                drivers: { connect: raceInput.drivers.map((name) => ({ name })) },
            },
            include: raceRelations,
        });
        return toRace(race);
    },

    /**
    * Removes a race by id.
    * @param raceId The id of the race to remove.
    * @returns Whether a race was deleted.
    */
    async deleteRace(raceId: string): Promise<boolean> {
        if (!raceId) return false;

        const result = await prisma.race.deleteMany({ where: { id: raceId } });
        return result.count === 1;
    },
}
