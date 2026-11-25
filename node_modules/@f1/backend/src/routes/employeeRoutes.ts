import { Router } from "express";
import { racerController } from "../controllers/racerController";
import {
  validateRacerBody
} from "../validations/racerValidation";

export const racerRoutes = Router();

racerRoutes.get(
  "/",
  racerController.getAll
);

// racerRoutes.get(
//   "/:id",
//   validateRacerId,
//   racerController.getById
// );

racerRoutes.post(
  "/",
  validateRacerBody,
  racerController.add
);

racerRoutes.delete(
  "/:id",
  validateRacerId,
  racerController.remove
);