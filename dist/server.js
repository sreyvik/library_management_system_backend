import app from "./app.js";
import { env } from "./configs/env.js";
import { logger } from "./configs/logger.js";
import db, { initializeDatabase } from "./configs/db.js";
class Server {
    async start() {
        try {
            const connection = await db.getConnection();
            connection.release();
            await initializeDatabase();
            app.listen(env.PORT, () => {
                logger.info(`Server running on http://localhost:${env.PORT}`);
            });
        }
        catch (error) {
            if (error?.code === "ECONNREFUSED") {
                const host = process.env.DB_HOST ?? "localhost";
                const port = process.env.DB_PORT ?? "3306";
                logger.error(`Database connection refused. Check MySQL is running at ${host}:${port}.`);
            }
            const message = error?.message || error?.code || error?.stack || String(error);
            logger.error(`Server failed to start: ${message}`);
            process.exit(1);
        }
    }
}
const server = new Server();
server.start();
