import { Request, Response } from "express";
import BaseController from "./base.controller";
import DashboardService from "../services/dashboard.service";

export default class DashboardController extends BaseController {
  static async getDashboard(req: Request, res: Response): Promise<void> {
    try {
      const dashboardData = await DashboardService.getDashboardSummary();

      res.status(200).json({
        success: true,
        message: "Dashboard fetched successfully",
        data: dashboardData,
      });
    } catch (error) {
      DashboardController.sendError(res, error, "Failed to fetch dashboard");
    }
  }
}
