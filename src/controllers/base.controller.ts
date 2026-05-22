import { Response } from "express";

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