"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBook = exports.putBook = exports.editBook = exports.addBook = exports.getBook = exports.listBooks = void 0;
const book_service_1 = require("../services/book.service");
const parseId = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
};
const listBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield (0, book_service_1.getBooks)();
        return res.status(200).json({ success: true, data: books });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.listBooks = listBooks;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseId(req.params.id);
        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid book id" });
        }
        const book = yield (0, book_service_1.getBookById)(id);
        if (!book) {
            return res.status(404).json({ success: false, message: "book not found" });
        }
        return res.status(200).json({ success: true, data: book });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.getBook = getBook;
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const book = yield (0, book_service_1.createBook)((_a = req.body) !== null && _a !== void 0 ? _a : {});
        return res.status(201).json({
            success: true,
            message: "book created successfully",
            data: book
        });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});
exports.addBook = addBook;
const editBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = parseId(req.params.id);
        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid book id" });
        }
        const book = yield (0, book_service_1.updateBook)(id, (_a = req.body) !== null && _a !== void 0 ? _a : {});
        if (!book) {
            return res.status(404).json({ success: false, message: "book not found" });
        }
        return res.status(200).json({
            success: true,
            message: "book updated successfully",
            data: book
        });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});
exports.editBook = editBook;
exports.putBook = exports.editBook;
const removeBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseId(req.params.id);
        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid book id" });
        }
        const deleted = yield (0, book_service_1.deleteBook)(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "book not found" });
        }
        return res.status(200).json({
            success: true,
            message: "book deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.removeBook = removeBook;
