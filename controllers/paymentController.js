import { successResponse } from "../utils.js";
import Stripe from "stripe";
import Order from "../models/order.js";

export default class paymentController {
  static checkout(req, res, next) {
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
      .then(() => {
        const stripe = new Stripe("sk_test_Fdj5OmcjhvItTcESG8Y3ciNz");

        const { lineItems, success_url, cancel_url } = req.body;

        return stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          success_url,
          cancel_url,
        });
      })
      .then((session) => successResponse(res, { url: session.url }))
      .catch((exception) => next(new Error(exception)));
  }
}
