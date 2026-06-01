import mysql from 'mysql2/promise';
import { env } from './env.js';

const db = mysql.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,

    // MySQL port
    port: env.DB_PORT,

    waitForConnections: true,
    connectionLimit: 10
});

export async function initializeDatabase(): Promise<void> {
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

export default db;
