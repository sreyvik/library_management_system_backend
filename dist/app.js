import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bookRoutes from "./routes/book.routes.js";
import memberRoutes from "./routes/member.routes.js";
import borrowingRoutes from "./routes/borrow.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { notFound } from "./middleware/notFound.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
class App {
    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandlers();
    }
    configureMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        // Secure CORS configuration
        this.app.use(cors({
            origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
            credentials: true,
            optionsSuccessStatus: 200
        }));
        this.app.use(helmet());
        // Prevent caching on GET requests (fixes data refresh issue)
        this.app.use((req, res, next) => {
            res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            res.set('Pragma', 'no-cache');
            res.set('Expires', '0');
            next();
        });
        this.app.use(morgan("dev", {
            skip: (req, res) => req.originalUrl.startsWith("/api/auth"),
        }));
    }
    configureRoutes() {
        this.app.get("/", this.rootHandler);
        this.app.get("/health", this.healthHandler);
        this.app.get("/api", this.apiHandler);
        this.app.use("/api/books", bookRoutes);
        this.app.use("/api/members", memberRoutes);
        this.app.use("/api/auth", authRoutes);
        this.app.use("/api", borrowingRoutes);
        this.app.use("/api", dashboardRoutes);
        this.app.use("/api", reservationRoutes);
    }
    configureErrorHandlers() {
        this.app.use(notFound);
        this.app.use(errorHandler);
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
export default new App().app;
