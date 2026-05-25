"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const base_controller_1 = require("./base.controller");
const auth_service_1 = require("../services/auth.service");
class AuthController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.register = this.asyncHandler(async (req, res) => {
            const result = await this.authService.register(req.body);
            return this.successResponse(res, result.message, result.data, 201);
        });
        this.login = this.asyncHandler(async (req, res) => {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            return this.successResponse(res, "Login successful", result);
        });
        this.authService = new auth_service_1.AuthService();
    }
}
exports.AuthController = AuthController;
