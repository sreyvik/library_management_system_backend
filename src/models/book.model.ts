import db from "../configs/db";
import { BookCreateInput, BookRecord, BookUpdateInput } from "../interface/book.interface";

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

const mapCreatePayload = (book: BookCreateInput) => ({
    category_id: book.categoryId,
    title: book.title,
    author: book.author,
    isbn: book.isbn ?? null,
    published_year: book.publishedYear ?? null,
    quantity: book.quantity ?? 0,
    available_quantity: book.availableQuantity ?? book.quantity ?? 0
});

const mapUpdatePayload = (book: BookUpdateInput) => {
    const payload: Record<string, unknown> = {};

    if (book.title !== undefined) payload.title = book.title;
    if (book.author !== undefined) payload.author = book.author;
    if (book.isbn !== undefined) payload.isbn = book.isbn;
    if (book.categoryId !== undefined) payload.category_id = book.categoryId;
    if (book.publishedYear !== undefined) payload.published_year = book.publishedYear;
    if (book.quantity !== undefined) payload.quantity = book.quantity;
    if (book.availableQuantity !== undefined) payload.available_quantity = book.availableQuantity;

    return payload;
};

export const findAllBooks = async (): Promise<BookRecord[]> => {
    const [rows] = await db.query(`${BASE_SELECT} ORDER BY id DESC`);
    return rows as BookRecord[];
};

export const findBookById = async (id: number): Promise<BookRecord | null> => {
    const [rows] = await db.query(
        `${BASE_SELECT} WHERE id = ? LIMIT 1`,
        [id]
    );

    const books = rows as BookRecord[];
    return books.length > 0 ? books[0] : null;
};

export const createBookRecord = async (book: BookCreateInput): Promise<number> => {
    const [result] = await db.query("INSERT INTO books SET ?", [mapCreatePayload(book)]);
    return (result as { insertId: number }).insertId;
};

export const updateBookRecord = async (id: number, book: BookUpdateInput): Promise<boolean> => {
    const payload = mapUpdatePayload(book);

    if (Object.keys(payload).length === 0) {
        return false;
    }

    const [result] = await db.query(
        "UPDATE books SET ? WHERE id = ?",
        [payload, id]
    );

    return (result as { affectedRows: number }).affectedRows > 0;
};

export const deleteBookRecord = async (id: number): Promise<boolean> => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [existingRows] = await connection.query(
            "SELECT id FROM books WHERE id = ? LIMIT 1 FOR UPDATE",
            [id]
        );

        if ((existingRows as Array<{ id: number }>).length === 0) {
            await connection.rollback();
            return false;
        }

        // Remove dependent borrow history first so the book row can be deleted safely.
        await connection.query(
            "DELETE FROM borrow_records WHERE book_id = ?",
            [id]
        );

        const [result] = await connection.query(
            "DELETE FROM books WHERE id = ?",
            [id]
        );

        await connection.commit();
        return (result as { affectedRows: number }).affectedRows > 0;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

export const deleteAllBooksRecord = async (): Promise<boolean> => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // Remove dependent borrow history first
        await connection.query("DELETE FROM borrow_records");

        // Delete all books
        const [result] = await connection.query("DELETE FROM books");

        await connection.commit();
        return (result as { affectedRows: number }).affectedRows >= 0;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
