import express from "express";
import productController from "../controllers/productController.js";
import isAuth from "./../middlewares/is-auth.js";

const router = express.Router();

router.get("/", productController.index);
router.post("/", isAuth, productController.store);
router.get("/:id", productController.show);
router.put("/:id", isAuth, productController.update);
router.delete("/:id", isAuth, productController.destroy);

export default router;
