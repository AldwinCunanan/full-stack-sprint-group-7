import type { Request, Response } from "express";
import { racerService } from "../services/racerService.ts";

export const racerController = {
  async getAll(_req: Request, res: Response) {
    const racers = await racerService.getAll();
    res.json(racers);
  }
};