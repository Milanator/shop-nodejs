import Product from "../models/Product.js";
import { successResponse, failedResponse } from "../utils.js";

class cartController {
  static async index(req, res) {
    req.user
      .getCart()
      .then((cart) => {
        successResponse(res, cart.getProducts());
      })
      .catch((exception) => {
        failedResponse(res, exception);
      });
  }

  static async store(req, res) {
    const id = 1;

    let cart = undefined;
    let quantity = 1;

    req.user
      .getCart()
      .then((userCart) => {
        cart = userCart;

        // get product from cart
        return userCart.getProducts({ where: { id } });
      })
      .then((product) => {
        // add new product to cart - find product
        if (!product) {
          return Product.findOne({ where: { id } });
        }

        // update existing - existing product i ncart
        quantity = product.cartItem.quantity + 1;

        return product;
      })
      .then((product) => {
        // append to cart with quantity
        return cart.addProduct(product, {
          through: { quantity },
        });
      })
      .catch((exception) => {
        failedResponse(res, exception);
      });
  }
}

export default cartController;
