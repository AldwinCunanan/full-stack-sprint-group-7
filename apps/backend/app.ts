import "dotenv/config";
import express from "express";
import cors from "cors";
import { racesRoutes } from "./src/routes/racesRoutes.ts";
import type {
  Request,
  Response,
  NextFunction
} from "express";

<<<<<<< HEAD
// import { userRoutes } from "./routes/userRoutes";
=======
import walletRoutes from "./src/routes/walletRoutes.ts"
// import { racesRoutes } from "./routes/racesRoutes";
>>>>>>> sprint4-ac
// import { racerRoutes } from "./routes/racerRoutes";
 
const app = express();
 
const frontendUrl = process.env.FRONTEND_URL;
 
if (!frontendUrl) {
  throw new Error("FRONTEND_URL is required");
}
 
app.use(cors({ origin: frontendUrl }));
app.use(express.json());

app.use("/api/races", racesRoutes);
 
app.use((req, _res, next) => {
  console.log(req.method, req.url);
  next();
});

<<<<<<< HEAD
// app.use("/api/user", userRoutes);
app.use("/api/races", racesRoutes);
=======
app.use("/api/wallet", walletRoutes)
// app.use("/api/races", racesRoutes);
>>>>>>> sprint4-ac
// app.use("/api/racers", racerRoutes);
 
// Central error handler
app.use((
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error);
  res.status(500).json({
    error: "Unexpected server error"
  });
});
 
export default app;
