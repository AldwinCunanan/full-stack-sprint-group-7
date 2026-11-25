import type { Racer } from "../../../../shared/types/racer_type";

const API_URL = "http://localhost:3000";

export const racerService = {
    async getAll(): Promise<Racer[]> {
        const response = await fetch(`${API_URL}/api/racers`);

        if (!response.ok) {
            throw new Error("Failed to fetch racers");
        }

        return response.json();
    }
};