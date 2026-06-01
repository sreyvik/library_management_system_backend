"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllBooks = exports.removeBook = exports.putBook = exports.editBook = exports.addBook = exports.getBook = exports.listBooks = void 0;
const book_service_1 = require("../services/book.service");
const book_service_2 = require("../services/book.service");
const validation_1 = require("../utils/validation");
const response_1 = require("../utils/response");
const listBooks = async (req, res) => {
    try {
        const books = await (0, book_service_1.getBooks)();
        return (0, response_1.sendSuccess)(res, books, "Books fetched successfully");
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message);
    }
};
exports.listBooks = listBooks;
const getBook = async (req, res) => {
    try {
        const id = (0, validation_1.parseId)(req.params.id);
        if (id === null) {
            return (0, response_1.sendError)(res, "invalid book id", 400);
        }
        const book = await (0, book_service_1.getBookById)(id);
        if (!book) {
            return (0, response_1.sendError)(res, "book not found", 404);
        }
        return (0, response_1.sendSuccess)(res, book, "Book fetched successfully");
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message);
    }
};
exports.getBook = getBook;
const addBook = async (req, res) => {
    try {
        const book = await (0, book_service_1.createBook)(req.body ?? {});
        return (0, response_1.sendSuccess)(res, book, "book created successfully", 201);
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message, 400);
    }
};
exports.addBook = addBook;
const editBook = async (req, res) => {
    try {
        const id = (0, validation_1.parseId)(req.params.id);
        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid book id" });
        }
        const book = await (0, book_service_1.updateBook)(id, req.body ?? {});
        if (!book) {
            return res.status(404).json({ success: false, message: "book not found" });
        }
        return (0, response_1.sendSuccess)(res, book, "book updated successfully");
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message, 400);
    }
};
exports.editBook = editBook;
exports.putBook = exports.editBook;
const removeBook = async (req, res) => {
    try {
        const id = (0, validation_1.parseId)(req.params.id);
        if (id === null) {
            return (0, response_1.sendError)(res, "invalid book id", 400);
        }
        const deleted = await (0, book_service_1.deleteBook)(id);
        if (!deleted) {
            return (0, response_1.sendError)(res, "book not found", 404);
        }
        return (0, response_1.sendSuccess)(res, undefined, "book deleted successfully");
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message);
    }
};
exports.removeBook = removeBook;
const deleteAllBooks = async (req, res) => {
    try {
        const deleted = await (0, book_service_2.deleteAllBooks)();
        return (0, response_1.sendSuccess)(res, undefined, "all books deleted successfully");
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message);
    }
};
exports.deleteAllBooks = deleteAllBooks;
