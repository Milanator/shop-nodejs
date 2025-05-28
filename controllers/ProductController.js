import Product from "./../models/Product.js";

class ProductController {
  static async index(req, res) {
    const data = await new Product().get();

    res.status(200).json(data);
  }
}

export default ProductController;
