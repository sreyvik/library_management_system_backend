import { DashboardSummaryEntity, } from "../models/dashboard.model.js";
import DashboardRepository from "../repositories/dashboard.repository.js";
export default class DashboardService {
    static async getDashboardSummary() {
        const totalBooks = await DashboardRepository.getTotalBooks();
        const totalMembers = await DashboardRepository.getTotalMembers();
        const borrowedBooks = await DashboardRepository.getBorrowedBooks();
        const overdueBooks = await DashboardRepository.getOverdueBooks();
        const totalReservations = await DashboardRepository.getReservations();
        const dashboardSummary = DashboardSummaryEntity.create({
            totalBooks,
            totalMembers,
            borrowedBooks,
            overdueBooks,
            totalReservations,
        });
        return dashboardSummary.toJSON();
    }
}
