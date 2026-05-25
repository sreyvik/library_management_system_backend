"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../configs/db"));
class BaseDashboardRepository {
    static async hasTable(tableName) {
        const [rows] = await db_1.default.query(`SELECT COUNT(*) AS tableExists
       FROM information_schema.tables
       WHERE table_schema = DATABASE() AND table_name = ?`, [tableName]);
        return rows[0]?.tableExists > 0;
    }
    static async countAll(tableName) {
        if (!(await this.hasTable(tableName))) {
            return 0;
        }
        const [rows] = await db_1.default.query(`SELECT COUNT(*) AS total FROM \`${tableName}\``);
        return rows[0]?.total ?? 0;
    }
    static async countBorrowingsByStatus(status) {
        if (!(await this.hasTable("borrowings"))) {
            return 0;
        }
        const [rows] = await db_1.default.query(`SELECT COUNT(*) AS total FROM borrowings WHERE status = ?`, [status]);
        return rows[0]?.total ?? 0;
    }
}
class DashboardRepository extends BaseDashboardRepository {
    static async getTotalBooks() {
        return await this.countAll("books");
    }
    static async getTotalMembers() {
        return await this.countAll("members");
    }
    static async getBorrowedBooks() {
        return await this.countBorrowingsByStatus("Borrowed");
    }
    static async getOverdueBooks() {
        return await this.countBorrowingsByStatus("Late");
    }
    static async getReservations() {
        return await this.countAll("reservations");
    }
}
exports.default = DashboardRepository;
