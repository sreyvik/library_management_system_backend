"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = __importDefault(require("./base.controller"));
const borrow_service_1 = __importDefault(require("../services/borrow.service"));
class BorrowingsController extends base_controller_1.default {
    static borrowBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { memberId, bookId, borrowDate, dueDays, returnDate, status } = req.body;
                const result = yield borrow_service_1.default.borrowBook(memberId, bookId, borrowDate, dueDays, returnDate, status);
                res.status(201).json(result);
            }
            catch (error) {
                this.sendError(res, error, "Failed to borrow book");
            }
        });
    }
    static returnBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield borrow_service_1.default.returnBook(Number(req.params.id));
                res.status(200).json(result);
            }
            catch (error) {
                this.sendError(res, error, "Failed to return book");
            }
        });
    }
    static getBorrowing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield borrow_service_1.default.getBorrowingById(Number(req.params.id));
                res.status(200).json(result);
            }
            catch (error) {
                this.sendError(res, error, "Failed to fetch borrowing");
            }
        });
    }
}
exports.default = BorrowingsController;
