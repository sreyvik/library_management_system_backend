import { parseId } from "../utils/validation.js";
import BaseController from "./base.controller.js";
import ReservationService from "../services/reservation.service.js";
export default class ReservationController extends BaseController {
    static async createReservation(req, res) {
        try {
            const { memberId, bookId, reservationDate } = req.body;
            const result = await ReservationService.createReservation(memberId, bookId, reservationDate);
            res.status(201).json(result);
        }
        catch (error) {
            ReservationController.sendError(res, error, "Failed to create reservation");
        }
    }
    static async getReservation(req, res) {
        try {
            const id = parseId(req.params.id);
            if (id === null) {
                res.status(400).json({ success: false, message: "invalid reservation id" });
                return;
            }
            const result = await ReservationService.getReservationById(id);
            res.status(200).json(result);
        }
        catch (error) {
            ReservationController.sendError(res, error, "Failed to fetch reservation");
        }
    }
    static async listReservations(req, res) {
        try {
            const result = await ReservationService.listReservations();
            res.status(200).json(result);
        }
        catch (error) {
            ReservationController.sendError(res, error, "Failed to list reservations");
        }
    }
    static async updateReservation(req, res) {
        try {
            const id = parseId(req.params.id);
            if (id === null) {
                res.status(400).json({ success: false, message: "invalid reservation id" });
                return;
            }
            const { memberId, bookId, reservationDate, status } = req.body;
            const result = await ReservationService.updateReservation(id, memberId, bookId, reservationDate, status);
            res.status(200).json(result);
        }
        catch (error) {
            ReservationController.sendError(res, error, "Failed to update reservation");
        }
    }
    static async deleteReservation(req, res) {
        try {
            const id = parseId(req.params.id);
            if (id === null) {
                res.status(400).json({ success: false, message: "invalid reservation id" });
                return;
            }
            const result = await ReservationService.deleteReservation(id);
            res.status(200).json(result);
        }
        catch (error) {
            ReservationController.sendError(res, error, "Failed to delete reservation");
        }
    }
    static async deleteAllReservations(req, res) {
        try {
            const result = await ReservationService.deleteAllReservations();
            res.status(200).json(result);
        }
        catch (error) {
            ReservationController.sendError(res, error, "Failed to delete all reservations");
        }
    }
}
