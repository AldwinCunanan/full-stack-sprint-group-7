import { Race, RaceInput } from "../types/races"
import { races } from "../backend/data/racesData"
import { Guid } from "guid-typescript";


//This is mock data. Replace with API/DB calls once the real backend exists.
let racesData: Race[] = races.map((race) => ({
    ...race,
}));

export const racesRepo = {
    /**
    * Retrieves all races.
    * @returns Copies of every race in the races data, so callers can't mutate
    * the stored objects directly.
    */
    async getAllRaces(): Promise<Race[]> {
        return racesData.map(race => ({
            ...race,
        }));
    },

    /**
    * Retrieves a single race by id.
    * @param selectedId The id of the race to find.
    * @returns The matching race, or undefined if none exists.
    */
    async getRace(selectedId:string): Promise<Race | undefined> {
        return racesData.find(race => race.id === selectedId);
    },

    /**
    * Creates a new race and adds it to the raceData.
    * @param raceInput The race details.
    * @returns The newly created race, including its generated id.
    */
    async createRace(raceInput:RaceInput): Promise<Race> {
        const race: Race = {
            id: Guid.create().toString(),
            name: raceInput.name,
            location: raceInput.location,
            trackLength: raceInput.trackLength,
            trackImg: raceInput.trackImg,
            date: raceInput.date,
            drivers: raceInput.drivers,
        };

        racesData = [...racesData, race];

        return race;
    },

    /**
    * Removes a race by id.
    * @param raceId The id of the race to remove.
    */
    async deleteRace(raceId:string): Promise<void> {
        racesData = racesData.filter(race => race.id !== raceId)
    },
}