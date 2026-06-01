"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservation_controller_1 = __importDefault(require("../controllers/reservation.controller"));
const router = (0, express_1.Router)();
router.get("/reservations", reservation_controller_1.default.listReservations);
router.post("/reservations", reservation_controller_1.default.createReservation);
router.get("/reservations/:id", reservation_controller_1.default.getReservation);
router.put("/reservations/:id", reservation_controller_1.default.updateReservation);
router.delete("/reservations/:id", reservation_controller_1.default.deleteReservation);
router.delete("/reservations", reservation_controller_1.default.deleteAllReservations);
exports.default = router;
