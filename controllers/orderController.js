import Order from "../models/order.js";
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
}

export default orderController;
