const express = require("express");
import {
    addBook,
    editBook,
    getBook,
    listBooks,
    putBook,
    removeBook
} from "../controllers/book.controller";

const router = express.Router();

router.get("/", listBooks);
router.get("/:id", getBook);
router.post("/", addBook);
router.put("/:id", putBook);
router.delete("/:id", removeBook);

export default router;
