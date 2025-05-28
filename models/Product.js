import db from "./../plugins/mysql.js";

class Product {
  async get() {
    const [rows] = await db.execute("SELECT * FROM products");

    return rows;
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
