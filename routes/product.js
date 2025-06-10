import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

router.get("/", productController.index);
router.post("/", productController.store);
router.get("/:id", productController.show);
// router.put("/:id", productController.update);
// router.delete("/:id", productController.destroy);

export default router;
