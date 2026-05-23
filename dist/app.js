"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const routes_1 = __importDefault(require("./routes"));
const notFound_middleware_1 = require("./middlewares/notFound.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const app = express();
app.use(express.json());
app.use(cors());
app.use(routes_1.default);
app.get("/health", (req, res) => {
    res.json({
        message: "Server is running "
    });
});
app.use(notFound_middleware_1.notFound);
app.use(error_middleware_1.errorHandler);
exports.default = app;
