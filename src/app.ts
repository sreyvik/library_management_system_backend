import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import borrowingRoutes from "./routes/borrow.routes";
import dashboardRoutes from "./routes/dashboard.routes";

import authRoutes from "./routes/auth.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(helmet());

app.use(
  morgan("dev", {
    skip: (req, res) => {
      // Avoid noisy logs for auth endpoints during development refreshes
      if (req.originalUrl.startsWith("/api/auth")) return true;
      return false;
    },
  })
);

app.get("/", (req, res) => {
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
});

app.get("/health", (req, res) => {
  return res.status(200).json({
    message: "Server is running ",
  });
});

app.get("/api", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api", borrowingRoutes);
app.use("/api", dashboardRoutes);
app.use("/", borrowingRoutes);
app.use("/", dashboardRoutes);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

app.use(errorMiddleware);


export default app;
