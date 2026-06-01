import { Request, Response } from "express";
import { parseId } from "../utils/validation";
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
      const id = parseId(req.params.id as string);
      if (id === null) {
        res.status(400).json({ success: false, message: "invalid reservation id" });
        return;
      }
      const result = await ReservationService.getReservationById(id);
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

  static async updateReservation(req: Request, res: Response): Promise<void> {
    try {
      const id = parseId(req.params.id as string);
      if (id === null) {
        res.status(400).json({ success: false, message: "invalid reservation id" });
        return;
      }
      const { memberId, bookId, reservationDate, status } = req.body;

      const result = await ReservationService.updateReservation(id, memberId, bookId, reservationDate, status);
      res.status(200).json(result);
    } catch (error) {
      ReservationController.sendError(res, error, "Failed to update reservation");
    }
  }

  static async deleteReservation(req: Request, res: Response): Promise<void> {
    try {
      const id = parseId(req.params.id as string);
      if (id === null) {
        res.status(400).json({ success: false, message: "invalid reservation id" });
        return;
      }
      const result = await ReservationService.deleteReservation(id);
      res.status(200).json(result);
    } catch (error) {
      ReservationController.sendError(res, error, "Failed to delete reservation");
    }
  }

  static async deleteAllReservations(req: Request, res: Response): Promise<void> {
    try {
      const result = await ReservationService.deleteAllReservations();
      res.status(200).json(result);
    } catch (error) {
      ReservationController.sendError(res, error, "Failed to delete all reservations");
    }
  }
}