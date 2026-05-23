const express = require("express");
import bookRoutes from "./book.routes";

const router = express.Router();

router.use("/api/books", bookRoutes);

export default router;
