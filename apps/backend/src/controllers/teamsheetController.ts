import type { Request, Response } from "express";
import { teamsheetService } from "../services/teamsheetService.ts";

export const teamsheetController = {

    async getAll(_req: Request, res: Response) {
    const teamsheets = await teamsheetService.getAll();
    res.json(teamsheets);
  },

  async create(req: Request, res: Response) {
    const { teamName, selectedRacers, bettingTotal } = req.body;

    const result = await teamsheetService.createTeamsheet(
      teamName,
      selectedRacers,
      bettingTotal
    );

    if (!result.success) {
        res.status(400).json({ error: result.message});
        return;
      }

    res.status(201).json(result.teamsheets);
  },

async delete(req: Request, res: Response) {
    const id = req.params.id;

    if (typeof id !== "string") {
        res.status(400).json({ error: "Invalid teamsheet ID"});
        return;
    }

    const result = await teamsheetService.deleteTeamsheet(id);

    if (!result.success) {
      res.status(404).json({ error: result.message });
      return;
    }

    res.json(result.teamsheets);
  }
};