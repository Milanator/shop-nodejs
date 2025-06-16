// packages
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import ConnectMongodbSession from "connect-mongodb-session";

import {
  FRONTEND_ORIGIN,
  MONGO_CONNECTION,
  SERVER_PORT,
  HASH_KEY,
} from "./constants.js";

// models
import User from "./models/User.js";

// routes
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import authRoutes from "./routes/auth.js";
import { failedResponse } from "./utils.js";

const app = express();

// session
const MongoDBStore = ConnectMongodbSession(session);
const store = new MongoDBStore({
  uri: MONGO_CONNECTION,
  collection: "sessions",
});

// plugin
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: HASH_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { sameSite: "strict" },
    store,
  })
);

app.use(cors({ credentials: true, origin: FRONTEND_ORIGIN }));

// set auth user model instance to request
app.use((req, res, next) => {
  // logged out
  if (!req.session.authUser) {
    return next();
  }

  // logged in
  return User.findById(req.session.authUser._id)
    .then((user) => {
      // instance of user model
      req.user = user;

      return next();
    })
    .catch((exception) => next(new Error(exception)));
});

// routes
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/auth", authRoutes);

// general error handling
app.use((err, req, res, next) => {
  failedResponse(res, { message: err.message });
});

// database
mongoose
  .connect(MONGO_CONNECTION)
  .then((result) => {
    app.listen(SERVER_PORT);
  })
  .catch((exception) => next(new Error(exception)));

export default app;
