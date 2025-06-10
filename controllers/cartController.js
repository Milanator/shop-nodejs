import Product from "../models/Product.js";
import Transformer from "../transformers/Cart.js";
import { successResponse, failedResponse } from "../utils.js";

class cartController {
  // return cart items
  static async index(req, res) {
    req.user
      .getCart()
      .then((cart) => cart.getProducts())
      .then((products) =>
        successResponse(res, {
          totalPrice: 0,
          items: Transformer.get(products),
        })
      )
      .catch((exception) => {
        failedResponse(res, exception);
      });
  }

  // add product to cart
  static async store(req, res) {
    let cart = undefined;
    let quantity = 1;

    const id = req.body.product;

    req.user
      .getCart()
      .then((userCart) => {
        cart = userCart;

        // get product from cart
        return userCart.getProducts({ where: { id } });
      })
      .then((products) => {
        // add new product to cart - find product
        if (!products.length) {
          return Product.findOne({ where: { id } });
        }

        // update existing - existing product i ncart
        quantity = products[0].cartItem.quantity + 1;

        return products[0];
      })
      .then((product) => {
        // append to cart with quantity
        return cart.addProduct(product, {
          through: { quantity },
        });
      })
      .then((product) => successResponse(res, product))
      .catch((exception) => failedResponse(res, exception));
  }
}

export default cartController;
