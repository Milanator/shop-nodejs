// packages
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { mongoConnect } from "./plugins/database.js";

// models

// routes
import productRoutes from "./routes/product.js";

const app = express();

// plugin
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// register user to request

// routes
app.use("/api/v1/product", productRoutes);

const port = 4000;

// relations

mongoConnect(() => {
  app.listen(port);
});

export default app;
