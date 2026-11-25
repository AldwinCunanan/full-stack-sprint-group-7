import type { Race, RaceInput } from "../../../../shared/types/races";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ENDPOINT = `${BASE_URL}/api/races`;

type RaceResponse = Omit<Race, "date"> & { date: string };

async function readJson<T>(response: Response): Promise<T> {
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return (await response.json()) as T;
}

function toRace(race: RaceResponse): Race {
    return { ...race, date: new Date(race.date) };
}

export const racesRepo = {
    async getAllRaces(): Promise<Race[]> {
        const response = await fetch(ENDPOINT);
        const races = await readJson<RaceResponse[]>(response);
        return races.map(toRace);
    },

    async getRace(selectedId: string): Promise<Race | undefined> {
        const response = await fetch(`${ENDPOINT}/${encodeURIComponent(selectedId)}`);
        if (response.status === 404) return undefined;

        const race = await readJson<RaceResponse>(response);
        return toRace(race);
    },

    async createRace(raceInput: RaceInput): Promise<Race> {
        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(raceInput),
        });
        const { race } = await readJson<{ race: RaceResponse }>(response);
        return toRace(race);
    },

    async deleteRace(raceId: string): Promise<void> {
        const response = await fetch(`${ENDPOINT}/${encodeURIComponent(raceId)}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
    },
};
