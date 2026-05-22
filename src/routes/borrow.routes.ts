import { Router } from "express";
import BorrowingsController from "../controllers/borrow.controller";

const router = Router();

// OOP static methods
router.post("/borrow", BorrowingsController.borrowBook);
router.put("/return/:id", BorrowingsController.returnBook);
router.get("/:id", BorrowingsController.getBorrowing);

export default router;