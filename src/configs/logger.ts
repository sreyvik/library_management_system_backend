class Logger {

    info(message: string): void {
        console.log(`[INFO] ${message}`);
    }

    error(message: string): void {
        console.error(`[ERROR] ${message}`);
    }

    warning(message: string): void {
        console.warn(`[WARNING] ${message}`);
    }
}

export const logger = new Logger();