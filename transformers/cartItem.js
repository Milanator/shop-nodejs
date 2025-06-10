class CartItemTransformer {
  static format(product, attribute) {
    const data = {
      quantity: product[attribute].quantity,
      product: {
        ...product,
        price: Number(product.price).toFixed(2),
      },
    };

    delete data.product[attribute];

    return data;
  }
}

export default CartItemTransformer;
