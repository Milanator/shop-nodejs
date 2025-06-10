import { getDb } from "./../plugins/database.js";
import { ObjectId } from "mongodb";

const COLLECTION = "products";

export default class Product {
  constructor(title, price, description, imageUrl, userId, id = undefined) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
    this.id = id;
  }

  static #whereId(id) {
    return { _id: new ObjectId(id) };
  }

  store() {
    return getDb()
      .collection(COLLECTION)
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((exception) => console.log(exception));
  }

  update() {
    return getDb()
      .collection(COLLECTION)
      .updateOne(Product.#whereId(this.id), { $set: this });
  }

  static destroy(id) {
    return getDb().collection(COLLECTION).deleteOne(this.#whereId(id));
  }

  static fetchAll() {
    return getDb()
      .collection(COLLECTION)
      .find()
      .toArray()
      .then((products) => products)
      .catch((exception) => console.log(exception));
  }

  static findById(id) {
    return getDb()
      .collection(COLLECTION)
      .find(Product.#whereId(id))
      .next()
      .then((product) => product)
      .catch((exception) => console.log(exception));
  }
}
