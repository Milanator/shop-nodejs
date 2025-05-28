import express from "express";
import Product from "./../models/Product.js";

const routes = express.Router();

// index
routes.get("/product", async (req, res) => {
  const product = new Product();
  const data = await product.get();

  res.status(200).json(data);
});

export default routes;
