import app from "./app";
import { PORT } from "./configs/port";
import { logger } from "./configs/logger";
import db, { initializeDatabase } from "./configs/db";

class Server {
  public async start(): Promise<void> {
    try {
      const connection = await db.getConnection();
      connection.release();

      await initializeDatabase();

      app.listen(PORT, () => {
        logger.info(`Server running on http://localhost:${PORT}`);
      });
    } catch (error: any) {
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
