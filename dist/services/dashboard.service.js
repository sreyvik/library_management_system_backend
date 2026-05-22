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
const dashboard_model_1 = require("../models/dashboard.model");
const dashboard_repository_1 = __importDefault(require("../repositories/dashboard.repository"));
class DashboardService {
    static getDashboardSummary() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalBooks = yield dashboard_repository_1.default.getTotalBooks();
            const totalMembers = yield dashboard_repository_1.default.getTotalMembers();
            const borrowedBooks = yield dashboard_repository_1.default.getBorrowedBooks();
            const overdueBooks = yield dashboard_repository_1.default.getOverdueBooks();
            const totalReservations = yield dashboard_repository_1.default.getReservations();
            const dashboardSummary = dashboard_model_1.DashboardSummaryEntity.create({
                totalBooks,
                totalMembers,
                borrowedBooks,
                overdueBooks,
                totalReservations,
            });
            return dashboardSummary.toJSON();
        });
    }
}
exports.default = DashboardService;
