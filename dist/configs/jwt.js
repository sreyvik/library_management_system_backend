"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("./env");
class JwtService {
    constructor() {
        this.secret = env_1.env.JWT_SECRET;
    }
    generateToken(payload) {
        const options = {
            expiresIn: "1d"
        };
        return jsonwebtoken_1.default.sign(payload, this.secret, options);
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, this.secret);
    }
    decodeToken(token) {
        return jsonwebtoken_1.default.decode(token);
    }
}
exports.default = new JwtService();
