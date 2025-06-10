import { getDb } from "../plugins/database.js";

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
}
