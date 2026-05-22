import { Response } from "express";

export default abstract class BaseController {
  protected static sendError(res: Response, error: unknown, fallbackMessage: string = "Request failed"): void {
    const message = error instanceof Error ? error.message : fallbackMessage;
    const statusCode = this.resolveStatusCode(message);

    res.status(statusCode).json({ message });
  }

  protected static resolveStatusCode(message: string): number {
    switch (message) {
      case "Book already borrowed":
        return 409;
      case "Borrowing not found":
      case "Not found":
        return 404;
      case "Already returned":
      case "Invalid borrow date":
      case "Invalid borrowDate":
        return 400;
      default:
        return 400;
    }
  }
}
