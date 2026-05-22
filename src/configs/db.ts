import mysql from "mysql2/promise";
import { env } from "./env";

class Database {

    private static pool = mysql.createPool({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10
    });

    public static async connect(): Promise<void> {

        try {

            const connection = await this.pool.getConnection();

            console.log("Database connected successfully");

            connection.release();

        } catch (error) {

            console.log("Database connection failed");

            throw error;
        }
    }

    public static getPool() {
        return this.pool;
    }
}

export default Database;