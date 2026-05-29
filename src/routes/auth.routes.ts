import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { loginDto } from "../dto/auth/login.dto";
import { registerDTO } from "../dto/auth/register.dto";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validation.middleware";
import { AuthRepository } from "../repositories/auth.repository";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}

const router = Router();
const authController = new AuthController();
const authRepository = new AuthRepository();

router.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Auth API",
    endpoints: {
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      profile: "GET /api/auth/me",
    },
  });
});

router.get("/register", (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Use POST /api/auth/register with JSON body",
    requiredFields: ["name", "email", "password"],
  });
});

router.get("/login", (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Use POST /api/auth/login with JSON body",
    requiredFields: ["email", "password"],
  });
});

router.get(
  "/me",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const user = await authRepository.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Authenticated",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
);

router.post("/register", registerDTO, validateRequest, authController.register);
router.post("/login", loginDto, validateRequest, authController.login);

export default router;
