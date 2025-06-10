import CartItemTransformer from "./cartItem.js";

class CartTransformer {
  static get(data) {
    return data.map((item) =>
      CartItemTransformer.format(item.dataValues, "cartItem")
    );
  }
}

export default CartTransformer;
