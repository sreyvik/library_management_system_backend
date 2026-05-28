"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getBooks = void 0;
const book_model_1 = require("../models/book.model");
const validateBook = (book = {}) => {
    if (book.categoryId === undefined || Number.isNaN(Number(book.categoryId))) {
        throw new Error("categoryId is required");
    }
    if (!book.title || book.title.trim() === "") {
        throw new Error("title is required");
    }
    if (!book.author || book.author.trim() === "") {
        throw new Error("author is required");
    }
};
const getBooks = async () => {
    return (0, book_model_1.findAllBooks)();
};
exports.getBooks = getBooks;
const getBookById = async (id) => {
    return (0, book_model_1.findBookById)(id);
};
exports.getBookById = getBookById;
const createBook = async (book) => {
    validateBook(book);
    const newId = await (0, book_model_1.createBookRecord)(book);
    const createdBook = await (0, book_model_1.findBookById)(newId);
    if (!createdBook) {
        throw new Error("book was created but could not be retrieved");
    }
    return createdBook;
};
exports.createBook = createBook;
const updateBook = async (id, book) => {
    const incomingBook = book ?? {};
    const exists = await (0, book_model_1.findBookById)(id);
    if (!exists) {
        return null;
    }
    if (incomingBook.title !== undefined || incomingBook.author !== undefined) {
        validateBook({
            categoryId: incomingBook.categoryId ?? exists.categoryId,
            title: incomingBook.title ?? exists.title,
            author: incomingBook.author ?? exists.author
        });
    }
    const updated = await (0, book_model_1.updateBookRecord)(id, incomingBook);
    if (!updated) {
        return exists;
    }
    return (0, book_model_1.findBookById)(id);
};
exports.updateBook = updateBook;
const deleteBook = async (id) => {
    return (0, book_model_1.deleteBookRecord)(id);
};
exports.deleteBook = deleteBook;
