const express = require("express");
const Product = require("../models/Product");

const routes = express.Router();

// index
routes.get("/product", (req, res) => {
  const product = new Product();

  product.save({ title: "Test", price: "10.2" });

  res.status(200).json({ message: "Ok" });
});

module.exports = routes;
