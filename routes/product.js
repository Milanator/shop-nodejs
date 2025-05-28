import express from "express";
import ProductController from "./../controllers/ProductController.js";

const routes = express.Router();

// index
routes.get("/product", ProductController.index);

export default routes;
