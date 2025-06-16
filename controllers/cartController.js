import Product from "./../models/product.js";
import { successResponse } from "../utils.js";

class cartController {
  static index(req, res, next) {
    req.user
      .populate("cart.items.productId")
      .then((user) => successResponse(res, user.cart))
      .catch((exception) => next(new Error(exception)));
  }

  static store(req, res, next) {
    Product.findById(req.body.product)
      .then((product) => req.user.addToCart(product))
      .then((result) => successResponse(res, {}))
      .catch((exception) => next(new Error(exception)));
  }

  static destroy(req, res, next) {
    Product.findById(req.params.product)
      .then((product) => req.user.deleteFromCart(product))
      .then((result) => successResponse(res, {}))
      .catch((exception) => next(new Error(exception)));
  }
}

export default cartController;
