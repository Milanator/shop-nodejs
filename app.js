// packages
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { mongoConnect } from "./plugins/database.js";

// models
import User from "./models/User.js";

// routes
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";

const app = express();

// plugin
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// register user to request
const userId = "68487b5b89a75e9ea6000a10";

app.use((req, res, next) => {
  User.findById(userId)
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);

      next();
    })
    .catch((exception) => console.log(exception));
});

// routes
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);

const port = 4000;

// relations

mongoConnect(() => {
  app.listen(port);
});

export default app;
