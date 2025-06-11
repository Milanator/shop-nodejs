// packages
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

// models
import User from "./models/User.js";

// routes
import productRoutes from "./routes/product.js";
// import cartRoutes from "./routes/cart.js";
// import orderRoutes from "./routes/order.js";

const app = express();

// plugin
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// register user to request
const userId = "68487b5b89a75e9ea6000a10";

// app.use((req, res, next) => {
//   User.findById(userId)
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id);

//       next();
//     })
//     .catch((exception) => console.log(exception));
// });

// routes
app.use("/api/v1/product", productRoutes);
// app.use("/api/v1/cart", cartRoutes);
// app.use("/api/v1/order", orderRoutes);

const port = 4000;

mongoose
  .connect(
    "mongodb+srv://navratilmilann:XwuSFq3KLQgRjQvs@nodejs-course.t5lqqq6.mongodb.net/?retryWrites=true&w=majority&appName=NodeJS-course"
  )
  .then((result) => {
    app.listen(port);
  })
  .catch((exception) => console.log(exception));

export default app;
