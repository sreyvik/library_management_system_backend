"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_repository_1 = require("../repositories/auth.repository");
const jwt_1 = require("../configs/jwt");
const http_error_1 = require("../errors/http.error");
class AuthService {
    constructor() {
        this.authRepository = new auth_repository_1.AuthRepository();
    }
    async register(userData) {
        const existingUser = await this.authRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new http_error_1.HttpError("Email already exists", 409);
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(userData.password, 10);
        userData.password = hashedPassword;
        const insertId = await this.authRepository.create(userData);
        const user = {
            id: insertId,
            name: userData.name,
            email: userData.email,
            role: userData.role || "Librarian",
        };
        const token = (0, jwt_1.generateToken)({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            message: "User registered successfully",
            data: {
                token,
                user,
            },
        };
    }
    async login(email, password) {
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
            throw new http_error_1.HttpError("Invalid credentials", 401);
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new http_error_1.HttpError("Invalid credentials", 401);
        }
        // Generate JWT
        const token = (0, jwt_1.generateToken)({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
}
exports.AuthService = AuthService;
