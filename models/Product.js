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

  save(rData) {
    const data = [rData.title, rData.price];

    return db.execute(
      "INSERT INTO products SET title = ?, price = ?",
      data,
      (err, result, fields) => {
        if (err instanceof Error) {
          console.log(err);
          return;
        }

        return result;
      }
    );
  }
}

export default Product;
