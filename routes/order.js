import express from "express";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.get("/", orderController.index);
router.post("/", orderController.store);
router.get("/invoice/:id", orderController.downloadInvoice);

export default router;
