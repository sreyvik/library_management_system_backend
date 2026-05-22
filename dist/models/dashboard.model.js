"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardSummaryEntity = exports.CountMetric = void 0;
class DashboardMetric {
    constructor(label, value) {
        this.label = label;
        this.value = value;
    }
}
class CountMetric extends DashboardMetric {
    static create(label, value) {
        return new CountMetric(label, value);
    }
}
exports.CountMetric = CountMetric;
class DashboardSummaryEntity {
    constructor(totalBooks, totalMembers, borrowedBooks, overdueBooks, totalReservations) {
        this.totalBooks = totalBooks;
        this.totalMembers = totalMembers;
        this.borrowedBooks = borrowedBooks;
        this.overdueBooks = overdueBooks;
        this.totalReservations = totalReservations;
    }
    static create(data) {
        return new DashboardSummaryEntity(CountMetric.create("totalBooks", data.totalBooks), CountMetric.create("totalMembers", data.totalMembers), CountMetric.create("borrowedBooks", data.borrowedBooks), CountMetric.create("overdueBooks", data.overdueBooks), CountMetric.create("totalReservations", data.totalReservations));
    }
    toJSON() {
        return {
            totalBooks: this.totalBooks.value,
            totalMembers: this.totalMembers.value,
            borrowedBooks: this.borrowedBooks.value,
            overdueBooks: this.overdueBooks.value,
            totalReservations: this.totalReservations.value,
        };
    }
}
exports.DashboardSummaryEntity = DashboardSummaryEntity;
