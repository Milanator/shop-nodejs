import Product from "./../models/product.js";
import { successResponse, failedResponse } from "../utils.js";

class cartController {
  static index(req, res) {
    req.user
      .populate("cart.items.productId")
      .then((user) => successResponse(res, user.cart))
      .catch((exception) => failedResponse(res, exception));
  }

  static store(req, res) {
    Product.findById(req.body.product)
      .then((product) => req.user.addToCart(product))
      .then((result) => successResponse(res, {}))
      .catch((exception) => failedResponse(res, exception));
  }

  static destroy(req, res) {
    Product.findById(req.params.product)
      .then((product) => req.user.deleteFromCart(product))
      .then((result) => successResponse(res, {}))
      .catch((exception) => failedResponse(res, exception));
  }
}

export default cartController;
