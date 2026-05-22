"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
class Logger {
    info(message) {
        console.log(`[INFO] ${message}`);
    }
    error(message) {
        console.error(`[ERROR] ${message}`);
    }
    warning(message) {
        console.warn(`[WARNING] ${message}`);
    }
}
exports.logger = new Logger();
