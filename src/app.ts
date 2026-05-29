import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bookRoutes from "./routes/book.routes";
import memberRoutes from "./routes/member.routes";
import borrowingRoutes from "./routes/borrow.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import reservationRoutes from "./routes/reservation.routes";
import authRoutes from "./routes/auth.routes";
import { notFound } from "./middleware/notFound.middleware";
import { errorHandler } from "./middleware/error.middleware";

class App {
  public readonly app: Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandlers();
  }

  private configureMiddleware(): void {
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
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
      next();
    });

    this.app.use(
      morgan("dev", {
        skip: (req: Request, res: Response) => req.originalUrl.startsWith("/api/auth"),
      })
    );
  }

  private configureRoutes(): void {
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

  private configureErrorHandlers(): void {
    this.app.use(notFound);
    this.app.use(errorHandler);
  }

  private rootHandler(req: Request, res: Response): Response {
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

  private healthHandler(req: Request, res: Response): Response {
    return res.status(200).json({
      success: true,
      message: "Server is running",
    });
  }

  private apiHandler(req: Request, res: Response): Response {
    return res.status(200).json({
      success: true,
      message: "API is running",
    });
  }
}

export default new App().app;
