import mysql from 'mysql2/promise';
import { env } from './env';

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

export default db;