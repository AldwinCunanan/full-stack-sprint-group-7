import type { Request, Response } from "express";
import type { CreateRacerInput } from "../../../../shared/types/racer";
import { racerService } from "../services/racersService";

export const racerController = {
  async getAll(_req: Request, res: Response) {
    const racers = await racerService.getAll();
    res.json(racers);
  },

  async add(req: Request, res: Response) {
    // Body has already passed validation middleware
    const racer = await racerService.add(
      req.body as CreateRacerInput
    );

    if (!racer.success) {
        res.status(400).json({ error: racer.message});
        return;
      }

    res.status(201).json(racer);
  },
};