import BaseController from "./base.controller.js";
import DashboardService from "../services/dashboard.service.js";
export default class DashboardController extends BaseController {
    static async getDashboard(req, res) {
        try {
            const dashboardData = await DashboardService.getDashboardSummary();
            res.status(200).json({
                success: true,
                message: "Dashboard fetched successfully",
                data: dashboardData,
            });
        }
        catch (error) {
            DashboardController.sendError(res, error, "Failed to fetch dashboard");
        }
    }
}
