import { Response } from "express";

<<<<<<< HEAD
export abstract class BaseController {

  protected successResponse(
    res: Response,
    message: string,
    data: any = null,
    statusCode: number = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  protected errorResponse(
    res: Response,
    error: any,
    statusCode: number = 500
  ) {
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }

  protected asyncHandler(fn: Function) {
    return (req: any, res: any, next: any) => {
      Promise.resolve(fn(req, res, next))
        .catch(next);
    };
  }
}
=======
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
>>>>>>> feat/develop
