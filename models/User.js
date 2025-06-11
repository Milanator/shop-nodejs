import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
      },
    ],
  },
});

schema.methods.addToCart = function (product) {
  const index = this.cart.items.findIndex(
    (i) => i.productId.toString() === product._id.toString()
  );

  if (index > -1) {
    // product is in cart
    this.cart.items[index].quantity++;
  } else {
    // product isn in cart
    this.cart.items.push({
      productId: product._id,
      quantity: 1,
    });
  }

  return this.save();
};

schema.methods.deleteFromCart = function (product) {
  this.cart.items = this.cart.items.filter(
    (i) => i.productId.toString() !== product._id.toString()
  );

  return this.save();
};

schema.methods.clearCart = function () {
  this.cart = { items: [] };

  return this.save();
};

export default mongoose.model("User", schema);
