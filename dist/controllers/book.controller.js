"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBook = exports.putBook = exports.editBook = exports.addBook = exports.getBook = exports.listBooks = void 0;
const book_service_1 = require("../services/book.service");
const parseId = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
};
const listBooks = async (req, res) => {
    try {
        const books = await (0, book_service_1.getBooks)();
        return res.status(200).json({ success: true, data: books });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.listBooks = listBooks;
const getBook = async (req, res) => {
    try {
        const id = parseId(req.params.id);
        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid book id" });
        }
        const book = await (0, book_service_1.getBookById)(id);
        if (!book) {
            return res.status(404).json({ success: false, message: "book not found" });
        }
        return res.status(200).json({ success: true, data: book });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getBook = getBook;
const addBook = async (req, res) => {
    try {
        const book = await (0, book_service_1.createBook)(req.body ?? {});
        return res.status(201).json({
            success: true,
            message: "book created successfully",
            data: book
        });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.addBook = addBook;
const editBook = async (req, res) => {
    try {
        const id = parseId(req.params.id);
        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid book id" });
        }
        const book = await (0, book_service_1.updateBook)(id, req.body ?? {});
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
};
exports.editBook = editBook;
exports.putBook = exports.editBook;
const removeBook = async (req, res) => {
    try {
        const id = parseId(req.params.id);
        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid book id" });
        }
        const deleted = await (0, book_service_1.deleteBook)(id);
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
};
exports.removeBook = removeBook;
