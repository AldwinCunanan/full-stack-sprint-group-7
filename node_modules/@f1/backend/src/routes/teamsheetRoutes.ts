
import { Router } from "express";
import { teamsheetController } from "../controllers/teamsheetController";
import { validateTeamsheetBody } from "../validations/teamsheetValidation";

const router = Router();

router.get("/", teamsheetController.getAll)
router.post("/", validateTeamsheetBody, teamsheetController.create)
router.delete("/", teamsheetController.delete)

export const teamsheetsRoutes = router;