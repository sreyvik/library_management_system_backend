import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";

import { registerDTO } from "../dto/auth/register.dto";
import { loginDto } from "../dto/auth/login.dto";

import { validateRequest }
from "../middleware/validation.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { AuthRepository } from "../repositories/auth.repository";

const router = Router();

const authController = new AuthController();

router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Auth API",
    endpoints: {
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
    },
  });
});

router.get("/register", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Use POST /api/auth/register with JSON body",
    requiredFields: ["name", "email", "password"],
  });
});

router.get("/login", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Use POST /api/auth/login with JSON body",
    requiredFields: ["email", "password"],
  });
});

router.get("/me", authMiddleware, async (req: any, res) => {
  const authRepository = new AuthRepository();

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
});

router.post(
  "/register",
  registerDTO,
  validateRequest,
  authController.register
);

router.post(
  "/login",
  loginDto,
  validateRequest,
  authController.login
);

export default router;
