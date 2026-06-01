export class ReservationEntity {
    constructor(id, memberId, bookId, reservationDate, status, createdAt) {
        this.id = id;
        this.memberId = memberId;
        this.bookId = bookId;
        this.reservationDate = reservationDate;
        this.status = status;
        this.createdAt = createdAt;
    }
    static parseDate(value, fieldName) {
        const d = new Date(value);
        if (Number.isNaN(d.getTime()))
            throw new Error(`Invalid ${fieldName}`);
        return d;
    }
    static formatDate(value) {
        return value.toISOString().split("T")[0];
    }
    static createNew(memberId, bookId, reservationDate, status = "Active") {
        const normalized = this.parseDate(reservationDate, "reservation date");
        return {
            memberId,
            bookId,
            reservationDate: this.formatDate(normalized),
            status,
        };
    }
    static fromRow(row) {
        return new ReservationEntity(row.id, row.member_id, row.book_id, new Date(row.reservation_date), row.status, row.created_at ? new Date(row.created_at) : undefined);
    }
    static fromCreateResult(id, data) {
        return new ReservationEntity(id, data.memberId, data.bookId, new Date(data.reservationDate), data.status);
    }
    toJSON() {
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
