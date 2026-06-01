export const sendSuccess = (res, data, message = "Success", statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};
export const sendError = (res, message, statusCode = 500, error) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error: error || message,
    });
};
