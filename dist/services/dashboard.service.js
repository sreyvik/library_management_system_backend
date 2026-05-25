"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_model_1 = require("../models/dashboard.model");
const dashboard_repository_1 = __importDefault(require("../repositories/dashboard.repository"));
class DashboardService {
    static async getDashboardSummary() {
        const totalBooks = await dashboard_repository_1.default.getTotalBooks();
        const totalMembers = await dashboard_repository_1.default.getTotalMembers();
        const borrowedBooks = await dashboard_repository_1.default.getBorrowedBooks();
        const overdueBooks = await dashboard_repository_1.default.getOverdueBooks();
        const totalReservations = await dashboard_repository_1.default.getReservations();
        const dashboardSummary = dashboard_model_1.DashboardSummaryEntity.create({
            totalBooks,
            totalMembers,
            borrowedBooks,
            overdueBooks,
            totalReservations,
        });
        return dashboardSummary.toJSON();
    }
}
exports.default = DashboardService;
