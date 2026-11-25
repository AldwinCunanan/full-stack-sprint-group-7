import app from "./app.ts";
import type { Server } from "node:http";

const PORT: string | number = process.env.PORT ?? 3000;

const server: Server = app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});

export { server };
