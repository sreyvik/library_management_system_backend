"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const member_routes_1 = __importDefault(require("./routes/member.routes"));
const notFound_middleware_1 = require("./middlewares/notFound.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/books", book_routes_1.default);
app.use("/api/members", member_routes_1.default);
app.get("/health", (req, res) => {
    res.json({
        message: "Server is running "
    });
});
app.use(notFound_middleware_1.notFound);
app.use(error_middleware_1.errorHandler);
=======
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const borrow_routes_1 = __importDefault(require("./routes/borrow.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const reservation_routes_1 = __importDefault(require("./routes/reservation.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev", {
    skip: (req, res) => {
        // Avoid noisy logs for auth endpoints during development refreshes
        if (req.originalUrl.startsWith("/api/auth"))
            return true;
        return false;
    },
}));
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
app.use("/api/auth", auth_routes_1.default);
app.use("/api", borrow_routes_1.default);
app.use("/api", dashboard_routes_1.default);
app.use("/api", reservation_routes_1.default);
app.use("/", borrow_routes_1.default);
app.use("/", dashboard_routes_1.default);
app.use("/", reservation_routes_1.default);
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.originalUrl,
    });
});
app.use(error_middleware_1.errorMiddleware);
>>>>>>> feat/develop
exports.default = app;
