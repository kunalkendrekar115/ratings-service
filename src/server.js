const db = require("./db");
const express = require("express");

const { ratingsRoute } = require("./app/routes");
const { logger, errorHandler } = require("restaurants-utils");

db.connectToDatabase();

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/ratings", ratingsRoute);

app.use(errorHandler);

app.listen(5000, () => logger.info("Running Ratings API Service"));
