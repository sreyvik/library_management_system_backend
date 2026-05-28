import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../interface/api-response.interface";

export abstract class BaseController {
  protected static sendError(res: Response, error: unknown, fallbackMessage: string = "Request failed"): void {
    const message = error instanceof Error ? error.message : fallbackMessage;
    const statusCode = this.resolveStatusCode(message);

    res.status(statusCode).json({
      success: false,
      message,
    });
  }

  protected static resolveStatusCode(message: string): number {
    switch (message) {
      case "Email already exists":
        return 409;
      case "Invalid credentials":
      case "Unauthorized":
      case "Invalid token":
        return 401;
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

  protected asyncHandler<T = unknown>(
    handler: (req: Request, res: Response, next: NextFunction) => Promise<T>
  ) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        await handler(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  }

  protected successResponse<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = 200
  ): Response<ApiResponse<T>> {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }
}

export default BaseController;
