import app from "./app";

const startServer = async () => {
  try {
    await testConnection();

    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error: any) {
    logger.error("Server failed to start: " + error.message);
    process.exit(1);
  }
};

startServer();