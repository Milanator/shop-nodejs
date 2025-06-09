import db from "./../plugins/mysql.js";

class Product {
  // get all products
  async get() {
    const [rows] = await db.execute("SELECT * FROM products");

    return rows;
  }

  // find single product
  async first(id) {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    return rows;
  }

  // store product
  async store(data) {
    await db.execute(
      "INSERT INTO products SET title = ?, price = ?, image_url = ?, description = ?",
      [data.title, data.price, data.image_url, data.description]
    );
  }

  // update product
  async update(data, id) {
    await db.execute(
      "UPDATE products SET title = ?, price = ?, image_url = ?, description = ? WHERE id = ?",
      [data.title, data.price, data.image_url, data.description, id]
    );
  }

  // delete product
  async delete(id) {
    await db.execute("DELETE FROM products WHERE id = ?", [id]);
  }
}

export default Product;
