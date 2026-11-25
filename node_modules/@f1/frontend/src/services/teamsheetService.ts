import type { Teamsheet } from "../../../../shared/types/teamsheet_type";
import type { Racer } from "../../../../shared/types/racer_type";

const API_URL = "http://localhost:3000";

export const teamsheetService = {
    async getAll(): Promise<Teamsheet[]> {
        const response = await fetch(`${API_URL}/api/teamsheets`);

        if (!response.ok) {
            throw new Error("Failed to fetch teamsheets");
        }

        return response.json();
    },

    async create(
        teamName: string,
        selectedRacers: Racer[],
        bettingTotal: number
    ): Promise<Teamsheet[]> {
        const response = await fetch(`${API_URL}/api/teamsheets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                teamName,
                selectedRacers,
                bettingTotal
            })
    });

    const data = await response.json();

    if (!response.ok) {
            throw new Error(data.error || data.message || "Failed to create teamsheet");
        }

        return data;
    },

    async delete(id: string): Promise<Teamsheet[]> {
        const response = await fetch(`${API_URL}/api/teamsheets/${id}`, {
            method: "DELETE"
    });

    const data = await response.json();
    
    if (!response.ok) {
            throw new Error(
                data.error || data.message || "Failed to delete teamsheet"
            );
        }

        return data;
    }
};