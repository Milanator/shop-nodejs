import { getDb } from "../plugins/database.js";
import { ObjectId } from "mongodb";

const COLLECTION = "products";

export default class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    return getDb()
      .collection(COLLECTION)
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((exception) => console.log(exception));
  }

  static fetchAll() {
    return getDb()
      .collection(COLLECTION)
      .find()
      .toArray()
      .then((products) => {
        console.log(products);

        return products;
      })
      .catch((exception) => console.log(exception));
  }

  static findById(id) {
    return getDb()
      .collection(COLLECTION)
      .find({ _id: new ObjectId(id) })
      .next()
      .then((product) => {
        console.log(product);

        return product;
      })
      .catch((exception) => console.log(exception));
  }
}
