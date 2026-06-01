import { BorrowingEntity, } from "../models/borrow.model.js";
import BorrowingRepository from "../repositories/borrow.repository.js";
export default class BorrowingService {
    static async borrowBook(memberId, bookId, borrowDate, dueDays = 7, returnDate = null, status = "Borrowed") {
        const activeBorrowing = await BorrowingRepository.findActiveByBookId(bookId);
        if (activeBorrowing) {
            throw new Error("Book already borrowed");
        }
        const borrowingData = BorrowingEntity.createNew(memberId, bookId, borrowDate, dueDays, returnDate, status);
        const borrowing = await BorrowingRepository.create(borrowingData);
        return borrowing.toJSON();
    }
    static async returnBook(id) {
        const borrowing = await BorrowingRepository.findById(id);
        if (!borrowing) {
            throw new Error("Borrowing not found");
        }
        if (borrowing.isReturned()) {
            throw new Error("Already returned");
        }
        borrowing.markReturned();
        await BorrowingRepository.returnBook(id);
        return { message: "Book returned successfully" };
    }
    static async getBorrowingById(id) {
        const borrowing = await BorrowingRepository.findById(id);
        if (!borrowing) {
            throw new Error("Not found");
        }
        if (borrowing.isOverdue()) {
            borrowing.markLate();
            await BorrowingRepository.markLate(id);
        }
        return borrowing.toJSON();
    }
}
