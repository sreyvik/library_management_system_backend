"use strict";
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
    // MySQL port
    port: env_1.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10
});
<<<<<<< HEAD
=======
async function initializeDatabase() {
    await db.query(`
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
    await db.query(`
        CREATE TABLE IF NOT EXISTS reservations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            member_id INT NOT NULL,
            book_id INT NOT NULL,
            reservation_date DATE NOT NULL,
            status ENUM('Active','Cancelled','Fulfilled') NOT NULL DEFAULT 'Active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
}
>>>>>>> feat/develop
exports.default = db;
