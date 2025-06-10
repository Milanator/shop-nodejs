import { successResponse, failedResponse } from "../utils.js";
import Transformer from "../transformers/order.js";

class orderController {
  static async index(req, res) {
    req.user
      .getOrders({ include: "products" })
      .then((orders) => Transformer.get(orders))
      .then((orders) => successResponse(res, orders))
      .catch((exception) => failedResponse(res, exception));
  }

  // store cart products to order + clear cart products
  static async store(req, res) {
    let cart = undefined;

    req.user
      .getCart()
      .then((userCart) => {
        cart = userCart;

        return userCart.getProducts();
      })
      .then((products) =>
        req.user.createOrder().then((order) =>
          order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };

              return product;
            })
          )
        )
      )
      .then((result) => cart.setProducts(null))
      .then((result) => successResponse(res, {}))
      .catch((exception) => failedResponse(res, exception));
  }
}

export default orderController;
