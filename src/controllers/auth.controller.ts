import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { AuthService } from "../services/auth.service";

export class AuthController extends BaseController {

  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  register = this.asyncHandler(
    async (req: Request, res: Response) => {

      const result = await this.authService.register(
        req.body
      );

      return this.successResponse(
        res,
        result.message,
        result.data,
        201
      );
    }
  );

  login = this.asyncHandler(
    async (req: Request, res: Response) => {

      const { email, password } = req.body;

      const result = await this.authService.login(
        email,
        password
      );

      return this.successResponse(
        res,
        "Login successful",
        result
      );
    }
  );
}
