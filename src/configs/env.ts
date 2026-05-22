import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,

  DB_HOST: process.env.DB_HOST || "localhost",

  DB_PORT: Number(process.env.DB_PORT) || 3306,

  DB_USER: process.env.DB_USER || "root",

  DB_PASSWORD: process.env.DB_PASSWORD || "",

  DB_NAME: process.env.DB_NAME || "library_management",

  JWT_SECRET: process.env.JWT_SECRET || "secret_key",

  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
};