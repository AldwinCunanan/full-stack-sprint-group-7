
import { Router } from "express";
import { teamsheetController } from "../controllers/teamsheetController.ts";
import { validateTeamsheetBody } from "../validations/teamsheetValidation.ts";

const router = Router();

router.get("/", teamsheetController.getAll)
router.post("/", validateTeamsheetBody, teamsheetController.create)
router.delete("/:id", teamsheetController.delete)

export const teamsheetsRoutes = router;