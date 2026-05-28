"use strict";
<<<<<<< HEAD
=======
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowingEntity = void 0;
class LibraryTransaction {
    constructor(memberId, bookId, borrowDate, dueDate, returnDate, status) {
        this.memberId = memberId;
        this.bookId = bookId;
        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
        this.status = status;
    }
    static parseDate(value, fieldName) {
        const parsedDate = new Date(value);
        if (Number.isNaN(parsedDate.getTime())) {
            throw new Error(`Invalid ${fieldName}`);
        }
        return parsedDate;
    }
    static formatDate(value) {
        return value.toISOString().split("T")[0];
    }
    resolveStatus(referenceDate = new Date()) {
        if (this.status === "Returned") {
            return "Returned";
        }
        if (referenceDate > this.dueDate) {
            return "Late";
        }
        return this.status;
    }
}
class BorrowingEntity extends LibraryTransaction {
    constructor(id, memberId, bookId, borrowDate, dueDate, returnDate, status, createdAt) {
        super(memberId, bookId, borrowDate, dueDate, returnDate, status);
        this.id = id;
        this.createdAt = createdAt;
    }
    static createNew(memberId, bookId, borrowDate, dueDays = 7, returnDate = null, status = "Borrowed") {
        const normalizedBorrowDate = this.parseDate(borrowDate, "borrow date");
        const normalizedDueDate = new Date(normalizedBorrowDate);
        normalizedDueDate.setDate(normalizedDueDate.getDate() + dueDays);
        return {
            memberId,
            bookId,
            borrowDate: this.formatDate(normalizedBorrowDate),
            dueDate: this.formatDate(normalizedDueDate),
            returnDate,
            status,
        };
    }
    static fromRow(row) {
        return new BorrowingEntity(row.id, row.member_id, row.book_id, new Date(row.borrow_date), new Date(row.due_date), row.return_date ? new Date(row.return_date) : null, row.status, row.created_at ? new Date(row.created_at) : undefined);
    }
    static fromCreateResult(id, data) {
        return new BorrowingEntity(id, data.memberId, data.bookId, new Date(data.borrowDate), new Date(data.dueDate), data.returnDate ? new Date(data.returnDate) : null, data.status);
    }
    getCurrentStatus(referenceDate = new Date()) {
        return this.resolveStatus(referenceDate);
    }
    isReturned() {
        return this.status === "Returned";
    }
    isOverdue(referenceDate = new Date()) {
        return this.getCurrentStatus(referenceDate) === "Late";
    }
    markLate() {
        if (!this.isReturned()) {
            this.status = "Late";
        }
    }
    markReturned(returnDate = new Date()) {
        this.returnDate = returnDate;
        this.status = "Returned";
    }
    toJSON() {
        return {
            id: this.id,
            memberId: this.memberId,
            bookId: this.bookId,
            borrowDate: this.borrowDate,
            dueDate: this.dueDate,
            returnDate: this.returnDate,
            status: this.getCurrentStatus(),
            createdAt: this.createdAt,
        };
    }
}
exports.BorrowingEntity = BorrowingEntity;
>>>>>>> feat/develop
