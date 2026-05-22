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
const promise_1 = __importDefault(require("mysql2/promise"));
const env_1 = require("./env.js");
class Database {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield this.pool.getConnection();
                console.log("Database connected successfully");
                connection.release();
            }
            catch (error) {
                console.log("Database connection failed");
                throw error;
            }
        });
    }
    static getPool() {
        return this.pool;
    }
}
Database.pool = promise_1.default.createPool({
    host: env_1.env.DB_HOST,
    user: env_1.env.DB_USER,
    password: env_1.env.DB_PASSWORD,
    database: env_1.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});
exports.default = Database;
