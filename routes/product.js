import express from "express";
import ProductController from "./../controllers/ProductController.js";

const routes = express.Router();

routes.get("/product", ProductController.index);
routes.get("/product/:id", ProductController.show);

export default routes;
