// packages
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import ConnectMongodbSession from "connect-mongodb-session";

// models
import User from "./models/User.js";

// routes
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import authRoutes from "./routes/auth.js";

const MONGO_CONNECTION =
  "mongodb+srv://navratilmilann:XwuSFq3KLQgRjQvs@nodejs-course.t5lqqq6.mongodb.net/?retryWrites=true&w=majority&appName=NodeJS-course";

const app = express();

// session
const MongoDBStore = ConnectMongodbSession(session);
const store = new MongoDBStore({
  uri: MONGO_CONNECTION,
  collection: "sessions",
});

// plugin
const HASH_KEY = "my-secret";
const FRONTEND_ORIGIN = "http://localhost:5173";

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
    .catch((exception) => console.log(exception));
});

// routes
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/auth", authRoutes);

const port = 4000;

// database
mongoose
  .connect(MONGO_CONNECTION)
  .then((result) => {
    app.listen(port);
  })
  .catch((exception) => console.log(exception));

export default app;
