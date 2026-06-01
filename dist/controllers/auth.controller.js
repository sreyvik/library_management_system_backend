import { BaseController } from "./base.controller.js";
import { AuthService } from "../services/auth.service.js";
export class AuthController extends BaseController {
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
        this.authService = new AuthService();
    }
}
