import express from "express";
import productController from "../controllers/productController.js";
import isAuth from "./../middlewares/is-auth.js";
import { storeRules } from "./../validators/product.js";

const router = express.Router();

router.get("/", productController.index);
router.post("/", storeRules, isAuth, productController.store);
router.get("/:id", productController.show);
router.put("/:id", storeRules, isAuth, productController.update);
router.delete("/:id", isAuth, productController.destroy);

export default router;
