import express from "express";
import bodyParser from "body-parser";

import productRoutes from "./routes/product.js";

const app = express();

// routes
app.use("/api/v1", productRoutes);

// plugin
app.use(bodyParser.urlencoded({ extended: true }));

const port = 4000;

app.listen(port);

export default app;
