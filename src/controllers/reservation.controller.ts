import { Request, Response } from "express";
import BaseController from "./base.controller";
import ReservationService from "../services/reservation.service";

export default class ReservationController extends BaseController {
  static async createReservation(req: Request, res: Response): Promise<void> {
    try {
      const { memberId, bookId, reservationDate } = req.body;

      const result = await ReservationService.createReservation(memberId, bookId, reservationDate);

      res.status(201).json(result);
    } catch (error) {
      ReservationController.sendError(res, error, "Failed to create reservation");
    }
  }

  static async getReservation(req: Request, res: Response): Promise<void> {
    try {
      const result = await ReservationService.getReservationById(Number(req.params.id));
      res.status(200).json(result);
    } catch (error) {
      ReservationController.sendError(res, error, "Failed to fetch reservation");
    }
  }

  static async listReservations(req: Request, res: Response): Promise<void> {
    try {
      const result = await ReservationService.listReservations();
      res.status(200).json(result);
    } catch (error) {
      ReservationController.sendError(res, error, "Failed to list reservations");
    }
  }
}
