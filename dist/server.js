"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port_1 = require("./configs/port");
const logger_1 = require("./configs/logger");
const db_1 = __importDefault(require("./configs/db"));
class Server {
    async start() {
        try {
            const connection = await db_1.default.getConnection();
            connection.release();
            app_1.default.listen(port_1.PORT, () => {
                logger_1.logger.info(`Server running on http://localhost:${port_1.PORT}`);
            });
        }
        catch (error) {
            if (error?.code === "ECONNREFUSED") {
                const host = process.env.DB_HOST ?? "localhost";
                const port = process.env.DB_PORT ?? "3306";
                logger_1.logger.error(`Database connection refused. Check MySQL is running at ${host}:${port}.`);
            }
            const message = error?.message ||
                error?.code ||
                error?.stack ||
                String(error);
            logger_1.logger.error(`Server failed to start: ${message}`);
            process.exit(1);
        }
    }
}
const server = new Server();
server.start();
