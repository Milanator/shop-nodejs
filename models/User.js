import { getDb } from "./../plugins/database.js";
import { ObjectId } from "mongodb";

const COLLECTION = "users";

export default class User {
  constructor(name, email) {
    this.name = name;
    this.email = name;
  }

  static #whereId(id) {
    return { _id: new ObjectId(id) };
  }

  save() {
    return getDb().collection(COLLECTION).insertOne(this);
  }

  static findById(id) {
    return getDb().collection(COLLECTION).findOne(User.#whereId(id));
  }
}
