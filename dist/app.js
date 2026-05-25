"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const borrow_routes_1 = __importDefault(require("./routes/borrow.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
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
app.use("/api", borrow_routes_1.default);
app.use("/api", dashboard_routes_1.default);
app.use("/", borrow_routes_1.default);
app.use("/", dashboard_routes_1.default);
exports.default = app;
