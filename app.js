import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import database from "./plugins/database.js";

import productRoutes from "./routes/product.js";

const app = express();

// plugin
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

// routes
app.use("/api/v1/product", productRoutes);

const port = 4000;

database
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
