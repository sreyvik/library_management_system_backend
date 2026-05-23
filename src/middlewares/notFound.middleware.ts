export const notFound = (req: any, res: any) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`
    });
};
