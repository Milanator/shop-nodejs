import CartItemTransformer from "./cartItem.js";

class OrderTransformer {
  static get(orders) {
    let data = [];

    for (var i = 0; i < orders.length; i++) {
      data[i] = {
        id: orders[i].id,
        userId: orders[i].userId,
        products: orders[i].products.map((product) =>
          CartItemTransformer.format(product.dataValues, "orderItem")
        ),
      };
    }

    return data;
  }
}

export default OrderTransformer;
