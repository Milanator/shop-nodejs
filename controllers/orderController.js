import Order from "../models/order.js";
import { successResponse, failedResponse } from "../utils.js";

class orderController {
  static index(req, res) {
    Order.find({ "user.userId": req.user._id })
      .then((orders) => successResponse(res, orders))
      .catch((exception) => failedResponse(res, exception));
  }

  static store(req, res) {
    req.user
      .populate("cart.items.productId")
      .then((user) => {
        const products = user.cart.items.map((i) => ({
          quantity: i.quantity,
          product: { ...i.productId._doc },
        }));

        const order = new Order({
          user: {
            name: user.name,
            userId: user,
          },
          products,
        });

        return order.save();
      })
      .then(() => req.user.clearCart())
      .then((result) => successResponse(res, {}))
      .catch((exception) => failedResponse(res, exception));
  }
}

export default orderController;
