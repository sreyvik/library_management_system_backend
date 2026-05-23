const express = require("express");
const cors = require("cors");
import routes from "./routes";
import { notFound } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/health", (req: any, res: any) => {
    res.json({
        message: "Server is running "
    });
});

app.use(notFound);
app.use(errorHandler);


export default app;
