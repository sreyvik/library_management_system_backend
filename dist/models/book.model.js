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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookRecord = exports.updateBookRecord = exports.createBookRecord = exports.findBookById = exports.findAllBooks = void 0;
const db_1 = __importDefault(require("../configs/db"));
const BASE_SELECT = `
    SELECT
        id,
        category_id AS categoryId,
        title,
        author,
        isbn,
        published_year AS publishedYear,
        quantity,
        available_quantity AS availableQuantity,
        created_at AS createdAt
    FROM books
`;
const mapCreatePayload = (book) => {
    var _a, _b, _c, _d, _e;
    return ({
        category_id: book.categoryId,
        title: book.title,
        author: book.author,
        isbn: (_a = book.isbn) !== null && _a !== void 0 ? _a : null,
        published_year: (_b = book.publishedYear) !== null && _b !== void 0 ? _b : null,
        quantity: (_c = book.quantity) !== null && _c !== void 0 ? _c : 0,
        available_quantity: (_e = (_d = book.availableQuantity) !== null && _d !== void 0 ? _d : book.quantity) !== null && _e !== void 0 ? _e : 0
    });
};
const mapUpdatePayload = (book) => {
    const payload = {};
    if (book.title !== undefined)
        payload.title = book.title;
    if (book.author !== undefined)
        payload.author = book.author;
    if (book.isbn !== undefined)
        payload.isbn = book.isbn;
    if (book.categoryId !== undefined)
        payload.category_id = book.categoryId;
    if (book.publishedYear !== undefined)
        payload.published_year = book.publishedYear;
    if (book.quantity !== undefined)
        payload.quantity = book.quantity;
    if (book.availableQuantity !== undefined)
        payload.available_quantity = book.availableQuantity;
    return payload;
};
const findAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.query(`${BASE_SELECT} ORDER BY id DESC`);
    return rows;
});
exports.findAllBooks = findAllBooks;
const findBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.query(`${BASE_SELECT} WHERE id = ? LIMIT 1`, [id]);
    const books = rows;
    return books.length > 0 ? books[0] : null;
});
exports.findBookById = findBookById;
const createBookRecord = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.default.query("INSERT INTO books SET ?", [mapCreatePayload(book)]);
    return result.insertId;
});
exports.createBookRecord = createBookRecord;
const updateBookRecord = (id, book) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = mapUpdatePayload(book);
    if (Object.keys(payload).length === 0) {
        return false;
    }
    const [result] = yield db_1.default.query("UPDATE books SET ? WHERE id = ?", [payload, id]);
    return result.affectedRows > 0;
});
exports.updateBookRecord = updateBookRecord;
const deleteBookRecord = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        yield connection.beginTransaction();
        const [existingRows] = yield connection.query("SELECT id FROM books WHERE id = ? LIMIT 1 FOR UPDATE", [id]);
        if (existingRows.length === 0) {
            yield connection.rollback();
            return false;
        }
        // Remove dependent borrow history first so the book row can be deleted safely.
        yield connection.query("DELETE FROM borrow_records WHERE book_id = ?", [id]);
        const [result] = yield connection.query("DELETE FROM books WHERE id = ?", [id]);
        yield connection.commit();
        return result.affectedRows > 0;
    }
    catch (error) {
        yield connection.rollback();
        throw error;
    }
    finally {
        connection.release();
    }
});
exports.deleteBookRecord = deleteBookRecord;
