import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import borrowingRoutes from "./routes/borrow.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
    res.json({
        message: "Server is running "
    });
});

app.use("/api", borrowingRoutes);
app.use("/", borrowingRoutes);


export default app;
