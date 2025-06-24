import Product from "./../models/product.js";
import { getStaticUrl, successResponse } from "../utils.js";

class cartController {
  static index(req, res, next) {
    req.user
      .populate("cart.items.productId")
      .then((user) => {
        user.cart.items = user.cart.items.map((i) => {
          i.productId.imageUrl = getStaticUrl(req, `/${i.productId.imageUrl}`);

          return i;
        });

        return successResponse(res, user.cart);
      })
      .catch((exception) => next(new Error(exception)));
  }

  static store(req, res, next) {
    Product.findById(req.body.product)
      .then((product) => req.user.addToCart(product))
      .then((result) => successResponse(res, req.user.cart))
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
