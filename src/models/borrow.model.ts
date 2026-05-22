export type BorrowingStatus = "Borrowed" | "Returned" | "Late";

export interface Borrowing {
  id: number;
  memberId: number;
  bookId: number;
  borrowDate: Date;
  dueDate: Date;
  returnDate: Date | null;
  status: BorrowingStatus;
  createdAt?: Date;
}

export interface BorrowingRow {
  id: number;
  member_id: number;
  book_id: number;
  borrow_date: Date | string;
  due_date: Date | string;
  return_date: Date | string | null;
  status: BorrowingStatus;
  created_at?: Date | string;
}

export interface CreateBorrowingData {
  memberId: number;
  bookId: number;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  status: BorrowingStatus;
}

abstract class LibraryTransaction {
  protected constructor(
    public memberId: number,
    public bookId: number,
    public borrowDate: Date,
    public dueDate: Date,
    public returnDate: Date | null,
    public status: BorrowingStatus
  ) {}

  protected static parseDate(value: string, fieldName: string): Date {
    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      throw new Error(`Invalid ${fieldName}`);
    }

    return parsedDate;
  }

  protected static formatDate(value: Date): string {
    return value.toISOString().split("T")[0];
  }

  protected resolveStatus(referenceDate: Date = new Date()): BorrowingStatus {
    if (this.status === "Returned") {
      return "Returned";
    }

    if (referenceDate > this.dueDate) {
      return "Late";
    }

    return this.status;
  }

  abstract toJSON(): Borrowing;
}

export class BorrowingEntity extends LibraryTransaction implements Borrowing {
  constructor(
    public id: number,
    memberId: number,
    bookId: number,
    borrowDate: Date,
    dueDate: Date,
    returnDate: Date | null,
    status: BorrowingStatus,
    public createdAt?: Date
  ) {
    super(memberId, bookId, borrowDate, dueDate, returnDate, status);
  }

  static createNew(
    memberId: number,
    bookId: number,
    borrowDate: string,
    dueDays: number = 7,
    returnDate: string | null = null,
    status: BorrowingStatus = "Borrowed"
  ): CreateBorrowingData {
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

  static fromRow(row: BorrowingRow): BorrowingEntity {
    return new BorrowingEntity(
      row.id,
      row.member_id,
      row.book_id,
      new Date(row.borrow_date),
      new Date(row.due_date),
      row.return_date ? new Date(row.return_date) : null,
      row.status,
      row.created_at ? new Date(row.created_at) : undefined
    );
  }

  static fromCreateResult(id: number, data: CreateBorrowingData): BorrowingEntity {
    return new BorrowingEntity(
      id,
      data.memberId,
      data.bookId,
      new Date(data.borrowDate),
      new Date(data.dueDate),
      data.returnDate ? new Date(data.returnDate) : null,
      data.status
    );
  }

  getCurrentStatus(referenceDate: Date = new Date()): BorrowingStatus {
    return this.resolveStatus(referenceDate);
  }

  isReturned(): boolean {
    return this.status === "Returned";
  }

  isOverdue(referenceDate: Date = new Date()): boolean {
    return this.getCurrentStatus(referenceDate) === "Late";
  }

  markLate(): void {
    if (!this.isReturned()) {
      this.status = "Late";
    }
  }

  markReturned(returnDate: Date = new Date()): void {
    this.returnDate = returnDate;
    this.status = "Returned";
  }

  override toJSON(): Borrowing {
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
