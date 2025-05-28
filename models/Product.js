const db = require("./../plugins/mysql");

class Product {
  async save(rData) {
    const data = [rData.title, rData.price];

    db.execute(
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

module.exports = Product;
