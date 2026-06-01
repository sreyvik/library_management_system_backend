import jwt from 'jsonwebtoken';
import { env } from './env.js';
export const generateToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: '1d'
    });
};
export const verifyToken = (token) => {
    return jwt.verify(token, env.JWT_SECRET);
};
export const jwtConfig = {
    secret: process.env.JWT_SECRET || "secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
};
