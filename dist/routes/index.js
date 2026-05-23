"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const book_routes_1 = __importDefault(require("./book.routes"));
const router = express.Router();
router.use("/api/books", book_routes_1.default);
exports.default = router;
