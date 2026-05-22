"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.db = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const env_1 = require("./env");
const logger_1 = require("./logger");
exports.db = promise_1.default.createPool({
    host: env_1.env.DB_HOST,
    user: env_1.env.DB_USER,
    password: env_1.env.DB_PASSWORD,
    database: env_1.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield exports.db.getConnection();
        logger_1.logger.info("Database connected successfully");
        conn.release();
    }
    catch (error) {
        logger_1.logger.error("Database connection failed: " + error.message);
        process.exit(1);
    }
});
exports.testConnection = testConnection;
