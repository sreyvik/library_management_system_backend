"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../configs/db"));
class BaseDashboardRepository {
    static hasTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const [rows] = yield db_1.default.query(`SELECT COUNT(*) AS tableExists
       FROM information_schema.tables
       WHERE table_schema = DATABASE() AND table_name = ?`, [tableName]);
            return ((_a = rows[0]) === null || _a === void 0 ? void 0 : _a.tableExists) > 0;
        });
    }
    static countAll(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!(yield this.hasTable(tableName))) {
                return 0;
            }
            const [rows] = yield db_1.default.query(`SELECT COUNT(*) AS total FROM \`${tableName}\``);
            return (_b = (_a = rows[0]) === null || _a === void 0 ? void 0 : _a.total) !== null && _b !== void 0 ? _b : 0;
        });
    }
    static countBorrowingsByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!(yield this.hasTable("borrowings"))) {
                return 0;
            }
            const [rows] = yield db_1.default.query(`SELECT COUNT(*) AS total FROM borrowings WHERE status = ?`, [status]);
            return (_b = (_a = rows[0]) === null || _a === void 0 ? void 0 : _a.total) !== null && _b !== void 0 ? _b : 0;
        });
    }
}
class DashboardRepository extends BaseDashboardRepository {
    static getTotalBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.countAll("books");
        });
    }
    static getTotalMembers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.countAll("members");
        });
    }
    static getBorrowedBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.countBorrowingsByStatus("Borrowed");
        });
    }
    static getOverdueBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.countBorrowingsByStatus("Late");
        });
    }
    static getReservations() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.countAll("reservations");
        });
    }
}
exports.default = DashboardRepository;
