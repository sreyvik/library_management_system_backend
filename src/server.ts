import app from "./app";

import { PORT } from "./configs/port";
import { logger } from "./configs/logger";
import Database from "./configs/db";

class Server {

    public async start(): Promise<void> {

        try {

            const connection = await Database.getConnection();
            connection.release();

            app.listen(PORT, () => {
                logger.info(`Server running on http://localhost:${PORT}`);
            });

        } catch (error: any) {

            logger.error(`Server failed to start: ${error.message}`);

            process.exit(1);
        }
    }
}

const server = new Server();

server.start();
