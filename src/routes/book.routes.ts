const express = require("express");
import {
    addBook,
    deleteAllBooks,
    editBook,
    getBook,
    listBooks,
    putBook,
    removeBook
} from "../controllers/book.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", listBooks);
router.get("/:id", getBook);
router.post("/", authMiddleware, addBook);
router.put("/:id", authMiddleware, editBook);
router.delete("/:id", authMiddleware, removeBook);
router.delete("/", authMiddleware, deleteAllBooks);

export default router;

