import type { Request, Response } from "express";
import { raceFormService } from "../services/racesServices.ts";

export const racesController = {
    async getRaces(_req: Request, res: Response) {
        const races = await raceFormService.getRaces();
        res.json(races);
    },

    async getRaceById(req: Request, res: Response) {
        const race = await raceFormService.getRace(String(req.params.id));

        if(race === undefined) {
            res.status(404).json({ error: "Race not found" });
            return;
        }

        res.json(race);
    },

    async addRace(req: Request, res: Response) {
        await raceFormService.addRace(req.body);

        res.status(201).json({ message: "Race created successfully." });
    },

    async deleteRace(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        if (!id?.trim()) {
            res.status(400).json({ error: "A race ID is required!" });
            return;
        }

        const deleted = await raceFormService.deleteRace(id);
        if (!deleted) {
            res.status(404).json({ error: "Race not found!" });
            return;
        }

        res.status(204).json({ message: "Race deleted successfully."});
    }
}
