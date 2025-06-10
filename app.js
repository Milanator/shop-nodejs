// packages
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import database from "./plugins/database.js";

// models
import User from "./models/user.js";
import Product from "./models/product.js";
import Cart from "./models/cart.js";
import CartItem from "./models/cartItem.js";
import Order from "./models/order.js";
import OrderItem from "./models/orderItem.js";

// routes
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";

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
app.use("/api/v1/order", orderRoutes);

const port = 4000;

// relations
User.hasMany(Product);
User.hasOne(Cart);
User.hasMany(Order);

Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });

// setup project
database
  // .sync({ force: true }) // refresh database
  .sync()
  .then(() => User.findOne({ where: { id: 1 } }))
  .then((user) => {
    return user
      ? user
      : User.create({ name: "Milan", email: "navratil.milann@gmail.com" });
  })
  .then((user) => {
    user.createCart();

    return user;
  })
  .then((user) =>
    user.getProducts().then((products) => {
      if (!products.length) {
        // no products
        user.createProduct({
          title: "Test",
          price: 10,
          imageUrl:
            "https://media.istockphoto.com/id/495477978/photo/open-book.jpg?s=612x612&w=0&k=20&c=vwJ6__M7CVPdjkQFUv9j2pr7QJiQ9bWW_5jXjR9TcjY=",
        });
      }
    })
  )
  .then(() => {
    app.listen(port);
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
