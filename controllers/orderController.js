import Order from "../models/order.js";
import fs from "fs";
import path from "path";
import { successResponse } from "../utils.js";

class orderController {
  static index(req, res, next) {
    Order.find({ "user.userId": req.user._id })
      .then((orders) => successResponse(res, orders))
      .catch((exception) => next(new Error(exception)));
  }

  static store(req, res, next) {
    req.user
      .populate("cart.items.productId")
      .then((user) => {
        const products = user.cart.items.map((i) => ({
          quantity: i.quantity,
          product: { ...i.productId._doc },
        }));

        const order = new Order({
          user: {
            email: req.user.email,
            userId: user,
          },
          products,
        });

        return order.save();
      })
      .then(() => req.user.clearCart())
      .then((result) => successResponse(res, {}))
      .catch((exception) => next(new Error(exception)));
  }

  static downloadInvoice(req, res, next) {
    const fileName = `${req.params.id}.pdf`;
    const invoicePath = path.join("data", "invoices", fileName);

    fs.readFile(invoicePath, (err, data) => {
      if (err) {
        return next(err);
      }

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="' + fileName + '"'
      );

      res.send(data);
    });
  }
}

export default orderController;
