"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controller_1 = __importDefault(require("../controllers/borrow.controller"));
const router = (0, express_1.Router)();
router.post("/borrow", borrow_controller_1.default.borrowBook);
router.put("/borrow/return/:id", borrow_controller_1.default.returnBook);
router.get("/borrow/:id", borrow_controller_1.default.getBorrowing);
exports.default = router;
