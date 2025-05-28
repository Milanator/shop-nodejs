import { isEmpty } from "./../utils.js";
import db from "./../plugins/mysql.js";

class Product {
  // get all products
  async get() {
    const [rows] = await db.execute("SELECT * FROM products");

    return rows;
  }

  // find single product
  async first(id) {
    const [row] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);

    return !isEmpty(row) ? row[0] : undefined;
  }

  async delete(id) {
    await db.execute("DELETE FROM products WHERE id = ?", [id]);
  }
}

export default Product;
