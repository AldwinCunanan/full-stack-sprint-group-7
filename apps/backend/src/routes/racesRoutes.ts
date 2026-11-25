import { Router } from "express";
import { racesController } from "../controllers/racesController.ts";
import { validateRaceBody } from "../validations/racesValidation.ts";

export const racesRoutes = Router();

racesRoutes.get("/", racesController.getRaces);
racesRoutes.get("/:id", racesController.getRaceById);
racesRoutes.post("/", validateRaceBody, racesController.addRace);
racesRoutes.delete("/:id", racesController.deleteRace);

