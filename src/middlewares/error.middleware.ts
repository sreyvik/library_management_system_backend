export const errorHandler = (error: any, req: any, res: any, next: any) => {
    const statusCode = error?.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: error?.message || "Internal server error"
    });
};
