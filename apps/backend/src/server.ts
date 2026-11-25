import app from "./app.ts";
import type { Server } from "node:http";
import path from "node:path";
import * as express from "express";

const PORT: string | number = process.env.PORT ?? 3000;

app.use(
    "/racerImages",
    express.static(path.join(process.cwd(), "src/data/racerImages"))
);

const server: Server = app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});


export { server };
