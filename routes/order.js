import express from "express";
import orderController from "../controllers/orderController.js";
import isAuth from "./../middlewares/is-auth.js";

const router = express.Router();

router.get("/", orderController.index);
router.get("/:id/invoice", isAuth, orderController.downloadInvoice);

export default router;
