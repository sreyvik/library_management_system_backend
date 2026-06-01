"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNumber = exports.validateEmail = exports.validateRequiredField = exports.parseId = void 0;
const parseId = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
};
exports.parseId = parseId;
const validateRequiredField = (value, fieldName) => {
    if (value === undefined || value === null) {
        throw new Error(`${fieldName} is required`);
    }
    if (typeof value === "string" && value.trim() === "") {
        throw new Error(`${fieldName} is required`);
    }
};
exports.validateRequiredField = validateRequiredField;
const validateEmail = (email, fieldName = "email") => {
    (0, exports.validateRequiredField)(email, fieldName);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error(`${fieldName} is invalid`);
    }
};
exports.validateEmail = validateEmail;
const validateNumber = (value, fieldName) => {
    if (value === undefined || Number.isNaN(Number(value))) {
        throw new Error(`${fieldName} is required`);
    }
};
exports.validateNumber = validateNumber;
