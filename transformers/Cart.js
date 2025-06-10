class CartTransformer {
  static format(item) {
    const data = {
      quantity: item.cartItem.quantity,
      product: {
        ...item,
        price: Number(item.price).toFixed(2),
      },
    };

    delete data.product.cartItem;

    return data;
  }

  static get(data) {
    return data.map((item) => this.format(item.dataValues));
  }
}

export default CartTransformer;
