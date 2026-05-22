export interface DashboardSummary {
  totalBooks: number;
  totalMembers: number;
  borrowedBooks: number;
  overdueBooks: number;
  totalReservations: number;
}

abstract class DashboardMetric {
  protected constructor(
    public readonly label: string,
    public readonly value: number
  ) {}
}

export class CountMetric extends DashboardMetric {
  static create(label: string, value: number): CountMetric {
    return new CountMetric(label, value);
  }
}

export class DashboardSummaryEntity {
  constructor(
    public totalBooks: CountMetric,
    public totalMembers: CountMetric,
    public borrowedBooks: CountMetric,
    public overdueBooks: CountMetric,
    public totalReservations: CountMetric
  ) {}

  static create(data: DashboardSummary): DashboardSummaryEntity {
    return new DashboardSummaryEntity(
      CountMetric.create("totalBooks", data.totalBooks),
      CountMetric.create("totalMembers", data.totalMembers),
      CountMetric.create("borrowedBooks", data.borrowedBooks),
      CountMetric.create("overdueBooks", data.overdueBooks),
      CountMetric.create("totalReservations", data.totalReservations)
    );
  }

  toJSON(): DashboardSummary {
    return {
      totalBooks: this.totalBooks.value,
      totalMembers: this.totalMembers.value,
      borrowedBooks: this.borrowedBooks.value,
      overdueBooks: this.overdueBooks.value,
      totalReservations: this.totalReservations.value,
    };
  }
}
