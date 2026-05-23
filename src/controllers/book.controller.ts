import {
    createBook,
    deleteBook,
    getBookById,
    getBooks,
    updateBook
} from "../services/book.service";

const parseId = (value: string): number | null => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
};

export const listBooks = async (req: any, res: any) => {
    try {
        const books = await getBooks();
        return res.status(200).json({ success: true, data: books });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getBook = async (req: any, res: any) => {
    try {
        const id = parseId(req.params.id);

        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid book id" });
        }

        const book = await getBookById(id);

        if (!book) {
            return res.status(404).json({ success: false, message: "book not found" });
        }

        return res.status(200).json({ success: true, data: book });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const addBook = async (req: any, res: any) => {
    try {
        const book = await createBook(req.body ?? {});
        return res.status(201).json({
            success: true,
            message: "book created successfully",
            data: book
        });
    } catch (error: any) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const editBook = async (req: any, res: any) => {
    try {
        const id = parseId(req.params.id);

        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid book id" });
        }

        const book = await updateBook(id, req.body ?? {});

        if (!book) {
            return res.status(404).json({ success: false, message: "book not found" });
        }

        return res.status(200).json({
            success: true,
            message: "book updated successfully",
            data: book
        });
    } catch (error: any) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const putBook = editBook;

export const removeBook = async (req: any, res: any) => {
    try {
        const id = parseId(req.params.id);

        if (id === null) {
            return res.status(400).json({ success: false, message: "invalid book id" });
        }

        const deleted = await deleteBook(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "book not found" });
        }

        return res.status(200).json({
            success: true,
            message: "book deleted successfully"
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
