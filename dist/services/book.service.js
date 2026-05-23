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
const getBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, book_model_1.findAllBooks)();
});
exports.getBooks = getBooks;
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, book_model_1.findBookById)(id);
});
exports.getBookById = getBookById;
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    validateBook(book);
    const newId = yield (0, book_model_1.createBookRecord)(book);
    const createdBook = yield (0, book_model_1.findBookById)(newId);
    if (!createdBook) {
        throw new Error("book was created but could not be retrieved");
    }
    return createdBook;
});
exports.createBook = createBook;
const updateBook = (id, book) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const incomingBook = book !== null && book !== void 0 ? book : {};
    const exists = yield (0, book_model_1.findBookById)(id);
    if (!exists) {
        return null;
    }
    if (incomingBook.title !== undefined || incomingBook.author !== undefined) {
        validateBook({
            categoryId: (_a = incomingBook.categoryId) !== null && _a !== void 0 ? _a : exists.categoryId,
            title: (_b = incomingBook.title) !== null && _b !== void 0 ? _b : exists.title,
            author: (_c = incomingBook.author) !== null && _c !== void 0 ? _c : exists.author
        });
    }
    const updated = yield (0, book_model_1.updateBookRecord)(id, incomingBook);
    if (!updated) {
        return exists;
    }
    return (0, book_model_1.findBookById)(id);
});
exports.updateBook = updateBook;
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, book_model_1.deleteBookRecord)(id);
});
exports.deleteBook = deleteBook;
