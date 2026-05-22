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
exports.initializeDatabase = initializeDatabase;
const promise_1 = __importDefault(require("mysql2/promise"));
const env_1 = require("./env");
const db = promise_1.default.createPool({
    host: env_1.env.DB_HOST,
    user: env_1.env.DB_USER,
    password: env_1.env.DB_PASSWORD,
    database: env_1.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.query(`
        CREATE TABLE IF NOT EXISTS borrowings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            member_id INT NOT NULL,
            book_id INT NOT NULL,
            borrow_date DATE NOT NULL,
            due_date DATE NOT NULL,
            return_date DATE NULL,
            status ENUM('Borrowed', 'Returned', 'Late') NOT NULL DEFAULT 'Borrowed',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    });
}
exports.default = db;
