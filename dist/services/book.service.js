import { createBookRecord, deleteAllBooksRecord, deleteBookRecord, findAllBooks, findBookById, updateBookRecord } from "../models/book.model.js";
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
export const getBooks = async () => {
    return findAllBooks();
};
export const getBookById = async (id) => {
    return findBookById(id);
};
export const createBook = async (book) => {
    validateBook(book);
    const newId = await createBookRecord(book);
    const createdBook = await findBookById(newId);
    if (!createdBook) {
        throw new Error("book was created but could not be retrieved");
    }
    return createdBook;
};
export const updateBook = async (id, book) => {
    const incomingBook = book ?? {};
    const exists = await findBookById(id);
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
    const updated = await updateBookRecord(id, incomingBook);
    if (!updated) {
        return exists;
    }
    return findBookById(id);
};
export const deleteBook = async (id) => {
    return deleteBookRecord(id);
};
export const deleteAllBooks = async () => {
    return deleteAllBooksRecord();
};
