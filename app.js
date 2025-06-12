// packages
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

// models
import User from "./models/User.js";

// routes
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import authRoutes from "./routes/auth.js";

const app = express();

// plugin
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// register user to request
const userId = "68497a6dcf35d45b85a9d448";

app.use((req, res, next) => {
  User.findById(userId)
    .then((user) => {
      req.user = user;
      console.log(req.user);
      next();
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
const CONNECTION =
  "mongodb+srv://navratilmilann:XwuSFq3KLQgRjQvs@nodejs-course.t5lqqq6.mongodb.net/?retryWrites=true&w=majority&appName=NodeJS-course";

mongoose
  .connect(CONNECTION)
  .then(() =>
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "milan",
          email: "navratil.milann@gmail.com",
          cart: { items: [] },
        });

        user.save();
      }
    })
  )
  .then((result) => {
    app.listen(port);
  })
  .catch((exception) => console.log(exception));

export default app;
