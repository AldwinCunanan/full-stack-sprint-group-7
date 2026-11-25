
import { Router } from "express";
import { teamsheetController } from "../controllers/teamsheetController";

const router = Router();

router.get("/", teamsheetController.getAll)
router.post("/", teamsheetController.create)
router.delete("/", teamsheetController.delete)

export const teamsheetsRoutes = router;