"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const register_dto_1 = require("../dto/auth/register.dto");
const login_dto_1 = require("../dto/auth/login.dto");
const validation_middleware_1 = require("../middleware/validation.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const auth_repository_1 = require("../repositories/auth.repository");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
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
router.get("/me", auth_middleware_1.authMiddleware, async (req, res) => {
    const authRepository = new auth_repository_1.AuthRepository();
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
router.post("/register", register_dto_1.registerDTO, validation_middleware_1.validateRequest, authController.register);
router.post("/login", login_dto_1.loginDto, validation_middleware_1.validateRequest, authController.login);
exports.default = router;
