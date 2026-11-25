import { Router } from "express";
import { racerController } from "../controllers/racerController";

const router = Router();

router.get("/", racerController.getAll)

export const racerRoutes = router;
