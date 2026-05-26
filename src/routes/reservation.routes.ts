import { Router } from "express";
import ReservationController from "../controllers/reservation.controller";

const router = Router();

router.post("/reservations", ReservationController.createReservation);
router.get("/reservations/:id", ReservationController.getReservation);

export default router;
