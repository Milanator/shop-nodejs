import { getDb } from "./../plugins/database.js";
import { ObjectId } from "mongodb";

const COLLECTION = "users";

export default class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart || { items: [] };
    this.id = id;
  }

  static #whereId(id) {
    return { _id: new ObjectId(id) };
  }

  compareProduct(cartItem, product) {
    return cartItem.productId.toString() === product._id.toString();
  }

  save() {
    return getDb().collection(COLLECTION).insertOne(this);
  }

  addToCart(product) {
    const index = this.cart.items.findIndex((i) =>
      this.compareProduct(i, product)
    );

    if (index > -1) {
      // product is in cart
      this.cart.items[index].quantity++;
    } else {
      // product isn in cart
      this.cart.items.push({
        productId: new ObjectId(product._id),
        quantity: 1,
      });
    }

    return getDb()
      .collection(COLLECTION)
      .updateOne(User.#whereId(this.id), { $set: { cart: this.cart } });
  }

  deleteFromCart(product) {
    this.cart.items = this.cart.items.filter(
      (i) => !this.compareProduct(i, product)
    );

    return getDb()
      .collection(COLLECTION)
      .updateOne(User.#whereId(this.id), { $set: { cart: this.cart } });
  }

  getCart() {
    const productIds = this.cart.items.map((i) => i.productId);

    return getDb()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) =>
        products.map((p) => ({
          product: p,
          quantity: this.cart.items.find((i) => this.compareProduct(i, p))
            .quantity,
        }))
      )
      .then((products) => ({
        totalPrice: 0,
        items: products,
      }));
  }

  static findById(id) {
    return getDb().collection(COLLECTION).findOne(User.#whereId(id));
  }
}
