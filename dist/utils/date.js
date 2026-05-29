"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOverdue = exports.addDays = exports.formatDate = exports.parseDate = void 0;
const parseDate = (dateString) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }
    return date;
};
exports.parseDate = parseDate;
const formatDate = (date) => {
    if (typeof date === "string") {
        return date;
    }
    return date.toISOString().split("T")[0];
};
exports.formatDate = formatDate;
const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
exports.addDays = addDays;
const isOverdue = (dueDate, currentDate = new Date()) => {
    return currentDate > dueDate;
};
exports.isOverdue = isOverdue;
