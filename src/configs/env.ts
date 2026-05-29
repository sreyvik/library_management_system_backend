import dotenv from "dotenv";

dotenv.config();

const validateEnv = () => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret || jwtSecret === 'secret_key') {
    throw new Error('JWT_SECRET must be set in environment variables and cannot be the default value');
  }
};

validateEnv();

export const env = {
  PORT: process.env.PORT || 3000,

  DB_HOST: process.env.DB_HOST || "localhost",

  DB_PORT: Number(process.env.DB_PORT) || 3306,

  DB_USER: process.env.DB_USER || "root",

  DB_PASSWORD: process.env.DB_PASSWORD || "",

  DB_NAME: process.env.DB_NAME || "library_management",

  JWT_SECRET: process.env.JWT_SECRET as string,

  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",

  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://localhost:3001",
};
