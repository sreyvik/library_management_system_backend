"use strict";
<<<<<<< HEAD
=======
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
>>>>>>> feat/develop
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port_1 = require("./configs/port");
const logger_1 = require("./configs/logger");
<<<<<<< HEAD
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
=======
const db_1 = __importStar(require("./configs/db"));
class Server {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield db_1.default.getConnection();
                connection.release();
                yield (0, db_1.initializeDatabase)();
                app_1.default.listen(port_1.PORT, () => {
                    logger_1.logger.info(`Server running on http://localhost:${port_1.PORT}`);
                });
>>>>>>> feat/develop
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
