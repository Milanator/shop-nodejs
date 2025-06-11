import Product from "../models/product.js";
import { successResponse, failedResponse } from "../utils.js";

class productController {
  static async index(req, res) {
    Product.find()
      .then((products) => successResponse(res, products))
      .catch((exception) =>
        failedResponse(res, exception, "Fail storing product")
      );
  }

  static async show(req, res) {
    Product.findById(req.params.id)
      .then((product) => successResponse(res, product))
      .catch((exception) => failedResponse(res, exception));
  }

  static async store(req, res) {
    const { title, price, imageUrl, description } = req.body;

    const product = new Product({ title, price, description, imageUrl });

    product
      .save() // mongoose
      .then(() => successResponse(res, {}, "Success storing product"))
      .catch((exception) =>
        failedResponse(res, exception, "Fail storing product")
      );
  }

  static async update(req, res) {
    const { title, imageUrl, description, price } = req.body;

    const product = new Product(
      title,
      price,
      description,
      imageUrl,
      req.user._id,
      req.params.id
    );

    product
      .update()
      .then((result) =>
        successResponse(res, {}, "Successfully updated product")
      )
      .catch((exception) => failedResponse(res, exception));
  }

  static async destroy(req, res) {
    Product.destroy(req.params.id)
      .then(() => successResponse(res, {}, "Successfully deleted product"))
      .catch((exception) => failedResponse(res, exception));
  }
}

export default productController;
