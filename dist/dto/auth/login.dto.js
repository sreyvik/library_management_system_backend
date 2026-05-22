"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDto = void 0;
const express_validator_1 = require("express-validator");
exports.loginDto = [
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("password").notEmpty(),
];
