"use strict";
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
const mapCreatePayload = (book) => ({
    category_id: book.categoryId,
    title: book.title,
    author: book.author,
    isbn: book.isbn ?? null,
    published_year: book.publishedYear ?? null,
    quantity: book.quantity ?? 0,
    available_quantity: book.availableQuantity ?? book.quantity ?? 0
});
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
const findAllBooks = async () => {
    const [rows] = await db_1.default.query(`${BASE_SELECT} ORDER BY id DESC`);
    return rows;
};
exports.findAllBooks = findAllBooks;
const findBookById = async (id) => {
    const [rows] = await db_1.default.query(`${BASE_SELECT} WHERE id = ? LIMIT 1`, [id]);
    const books = rows;
    return books.length > 0 ? books[0] : null;
};
exports.findBookById = findBookById;
const createBookRecord = async (book) => {
    const [result] = await db_1.default.query("INSERT INTO books SET ?", [mapCreatePayload(book)]);
    return result.insertId;
};
exports.createBookRecord = createBookRecord;
const updateBookRecord = async (id, book) => {
    const payload = mapUpdatePayload(book);
    if (Object.keys(payload).length === 0) {
        return false;
    }
    const [result] = await db_1.default.query("UPDATE books SET ? WHERE id = ?", [payload, id]);
    return result.affectedRows > 0;
};
exports.updateBookRecord = updateBookRecord;
const deleteBookRecord = async (id) => {
    const connection = await db_1.default.getConnection();
    try {
        await connection.beginTransaction();
        const [existingRows] = await connection.query("SELECT id FROM books WHERE id = ? LIMIT 1 FOR UPDATE", [id]);
        if (existingRows.length === 0) {
            await connection.rollback();
            return false;
        }
        // Remove dependent borrow history first so the book row can be deleted safely.
        await connection.query("DELETE FROM borrow_records WHERE book_id = ?", [id]);
        const [result] = await connection.query("DELETE FROM books WHERE id = ?", [id]);
        await connection.commit();
        return result.affectedRows > 0;
    }
    catch (error) {
        await connection.rollback();
        throw error;
    }
    finally {
        connection.release();
    }
};
exports.deleteBookRecord = deleteBookRecord;
