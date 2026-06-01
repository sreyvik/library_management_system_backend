import db from "../configs/db.js";

interface CountRow {
  total: number;
}

interface TableExistsRow {
  tableExists: number;
}

abstract class BaseDashboardRepository {
  protected static async hasTable(tableName: string): Promise<boolean> {
    const [rows] = await db.query(
      `SELECT COUNT(*) AS tableExists
       FROM information_schema.tables
       WHERE table_schema = DATABASE() AND table_name = ?`,
      [tableName]
    );

    return (rows as TableExistsRow[])[0]?.tableExists > 0;
  }

  protected static async countAll(tableName: string): Promise<number> {
    if (!(await this.hasTable(tableName))) {
      return 0;
    }

    const [rows] = await db.query(`SELECT COUNT(*) AS total FROM \`${tableName}\``);

    return (rows as CountRow[])[0]?.total ?? 0;
  }

  protected static async countBorrowingsByStatus(status: "Borrowed" | "Late"): Promise<number> {
    if (!(await this.hasTable("borrowings"))) {
      return 0;
    }

    const [rows] = await db.query(
      `SELECT COUNT(*) AS total FROM borrowings WHERE status = ?`,
      [status]
    );

    return (rows as CountRow[])[0]?.total ?? 0;
  }
}

export default class DashboardRepository extends BaseDashboardRepository {
  static async getTotalBooks(): Promise<number> {
    return await this.countAll("books");
  }

  static async getTotalMembers(): Promise<number> {
    return await this.countAll("members");
  }

  static async getBorrowedBooks(): Promise<number> {
    return await this.countBorrowingsByStatus("Borrowed");
  }

  static async getOverdueBooks(): Promise<number> {
    return await this.countBorrowingsByStatus("Late");
  }

  static async getReservations(): Promise<number> {
    return await this.countAll("reservations");
  }
}
