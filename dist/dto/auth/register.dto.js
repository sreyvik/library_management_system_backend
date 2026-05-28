"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDTO = void 0;
const express_validator_1 = require("express-validator");
exports.registerDTO = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("Name is required"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Valid email required"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];
