import {
  Borrowing,
  BorrowingEntity,
  BorrowingStatus,
} from "../models/borrow.model";
import BorrowingRepository from "../repositories/borrow.repository";

export default class BorrowingService {
  static async borrowBook(
    memberId: number,
    bookId: number,
    borrowDate: string,
    dueDays: number = 7,
    returnDate: string | null = null,
    status: BorrowingStatus = "Borrowed"
  ): Promise<Borrowing> {
    const activeBorrowing = await BorrowingRepository.findActiveByBookId(bookId);

    if (activeBorrowing) {
      throw new Error("Book already borrowed");
    }

    const borrowingData = BorrowingEntity.createNew(
      memberId,
      bookId,
      borrowDate,
      dueDays,
      returnDate,
      status
    );

    const borrowing = await BorrowingRepository.create(borrowingData);

    return borrowing.toJSON();
  }

  static async returnBook(id: number): Promise<{ message: string }> {
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

  static async getBorrowingById(id: number): Promise<Borrowing> {
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
