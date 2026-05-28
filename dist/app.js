"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const member_routes_1 = __importDefault(require("./routes/member.routes"));
const borrow_routes_1 = __importDefault(require("./routes/borrow.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const reservation_routes_1 = __importDefault(require("./routes/reservation.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const notFound_middleware_1 = require("./middleware/notFound.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandlers();
    }
    configureMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, morgan_1.default)("dev", {
            skip: (req, res) => req.originalUrl.startsWith("/api/auth"),
        }));
    }
    configureRoutes() {
        this.app.get("/", this.rootHandler);
        this.app.get("/health", this.healthHandler);
        this.app.get("/api", this.apiHandler);
        this.app.use("/api/books", book_routes_1.default);
        this.app.use("/api/members", member_routes_1.default);
        this.app.use("/api/auth", auth_routes_1.default);
        this.app.use("/api", borrow_routes_1.default);
        this.app.use("/api", dashboard_routes_1.default);
        this.app.use("/api", reservation_routes_1.default);
    }
    configureErrorHandlers() {
        this.app.use(notFound_middleware_1.notFound);
        this.app.use(error_middleware_1.errorHandler);
    }
    rootHandler(req, res) {
        return res.status(200).json({
            success: true,
            message: "Library Management System API",
            endpoints: {
                auth: {
                    register: "POST /api/auth/register",
                    login: "POST /api/auth/login",
                },
            },
        });
    }
    healthHandler(req, res) {
        return res.status(200).json({
            success: true,
            message: "Server is running",
        });
    }
    apiHandler(req, res) {
        return res.status(200).json({
            success: true,
            message: "API is running",
        });
    }
}
exports.default = new App().app;
