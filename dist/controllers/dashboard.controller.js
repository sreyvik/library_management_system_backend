"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = __importDefault(require("./base.controller"));
const dashboard_service_1 = __importDefault(require("../services/dashboard.service"));
class DashboardController extends base_controller_1.default {
    static async getDashboard(req, res) {
        try {
            const dashboardData = await dashboard_service_1.default.getDashboardSummary();
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
exports.default = DashboardController;
