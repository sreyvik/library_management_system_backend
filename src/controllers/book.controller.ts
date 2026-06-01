import { Request, Response } from "express";
import {
    createBook,
    deleteBook,
    getBookById,
    getBooks,
    updateBook
} from "../services/book.service.js";
import { deleteAllBooks as deleteAllBooksFn } from "../services/book.service.js";
import { parseId } from "../utils/validation.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const listBooks = async (req: Request, res: Response): Promise<Response> => {
    try {
        const books = await getBooks();
        return sendSuccess(res, books, "Books fetched successfully");
    } catch (error: any) {
        return sendError(res, error.message);
    }
};

export const getBook = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseId(req.params.id as string);

        if (id === null) {
            return sendError(res, "invalid book id", 400);
        }

        const book = await getBookById(id);

        if (!book) {
            return sendError(res, "book not found", 404);
        }

        return sendSuccess(res, book, "Book fetched successfully");
    } catch (error: any) {
        return sendError(res, error.message);
    }
};

export const addBook = async (req: Request, res: Response): Promise<Response> => {
    try {
        const book = await createBook(req.body ?? {});
        return sendSuccess(res, book, "book created successfully", 201);
    } catch (error: any) {
        return sendError(res, error.message, 400);
    }
};

export const editBook = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseId(req.params.id as string);

        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid book id" });
        }

        const book = await updateBook(id, req.body ?? {});

        if (!book) {
            return res.status(404).json({ success: false, message: "book not found" });
        }

        return sendSuccess(res, book, "book updated successfully");
    } catch (error: any) {
        return sendError(res, error.message, 400);
    }
};

export const putBook = editBook;

export const removeBook = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseId(req.params.id as string);

        if (id === null) {
            return sendError(res, "invalid book id", 400);
        }

        const deleted = await deleteBook(id);

        if (!deleted) {
            return sendError(res, "book not found", 404);
        }

        return sendSuccess(res, undefined, "book deleted successfully");
    } catch (error: any) {
        return sendError(res, error.message);
    }
};

export const deleteAllBooks = async (req: Request, res: Response): Promise<Response> => {
    try {
        const deleted = await deleteAllBooksFn();
        return sendSuccess(res, undefined, "all books deleted successfully");
    } catch (error: any) {
        return sendError(res, error.message);
    }
};
