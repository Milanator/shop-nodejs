// packages
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import database from "./plugins/database.js";

// models
import User from "./models/User.js";
import Product from "./models/Product.js";
import Cart from "./models/Cart.js";
import CartItem from "./models/CartItem.js";

// routes
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";

const app = express();

// plugin
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// register user to request
app.use((req, res, next) => {
  User.findOne({ where: { id: 1 } }).then((user) => {
    req.user = user;

    next();
  });
});

// routes
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);

const port = 4000;

// relations
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// setup project
database
  .sync({ force: true }) // refresh database
  // .sync()
  .then(() => User.findOne({ where: { id: 1 } }))
  .then((user) => {
    return user
      ? user
      : User.create({ name: "Milan", email: "navratil.milann@gmail.com" });
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(port);
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
