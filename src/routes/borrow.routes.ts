import { Router } from "express";
import BorrowingsController from "../controllers/borrow.controller.js";

const router = Router();

router.post("/borrow", BorrowingsController.borrowBook);
router.put("/borrow/return/:id", BorrowingsController.returnBook);
router.get("/borrow/:id", BorrowingsController.getBorrowing);

export default router;
