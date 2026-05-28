export type ReservationStatus = "Active" | "Cancelled" | "Fulfilled";

export interface Reservation {
  id: number;
  memberId: number;
  bookId: number;
  reservationDate: Date;
  status: ReservationStatus;
  createdAt?: Date;
}

export interface ReservationRow {
  id: number;
  member_id: number;
  book_id: number;
  reservation_date: Date | string;
  status: ReservationStatus;
  created_at?: Date | string;
}

export interface CreateReservationData {
  memberId: number;
  bookId: number;
  reservationDate: string;
  status: ReservationStatus;
}

export class ReservationEntity implements Reservation {
  constructor(
    public id: number,
    public memberId: number,
    public bookId: number,
    public reservationDate: Date,
    public status: ReservationStatus,
    public createdAt?: Date
  ) {}

  static parseDate(value: string, fieldName: string): Date {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) throw new Error(`Invalid ${fieldName}`);
    return d;
  }

  static formatDate(value: Date): string {
    return value.toISOString().split("T")[0];
  }

  static createNew(
    memberId: number,
    bookId: number,
    reservationDate: string,
    status: ReservationStatus = "Active"
  ): CreateReservationData {
    const normalized = this.parseDate(reservationDate, "reservation date");

    return {
      memberId,
      bookId,
      reservationDate: this.formatDate(normalized),
      status,
    };
  }

  static fromRow(row: ReservationRow): ReservationEntity {
    return new ReservationEntity(
      row.id,
      row.member_id,
      row.book_id,
      new Date(row.reservation_date),
      row.status,
      row.created_at ? new Date(row.created_at) : undefined
    );
  }

  static fromCreateResult(id: number, data: CreateReservationData): ReservationEntity {
    return new ReservationEntity(
      id,
      data.memberId,
      data.bookId,
      new Date(data.reservationDate),
      data.status
    );
  }

  toJSON(): Reservation {
    return {
      id: this.id,
      memberId: this.memberId,
      bookId: this.bookId,
      reservationDate: this.reservationDate,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}
