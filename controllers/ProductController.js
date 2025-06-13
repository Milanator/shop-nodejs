import Product from "../models/product.js";
import { successResponse, failedResponse } from "../utils.js";
import { validationResult } from "express-validator";

class productController {
  static async index(req, res) {
    Product.find()
      .select("title imageUrl price")
      .populate("userId", "name")
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
    const validation = validationResult(req);

    const { title, price, imageUrl, description } = req.body;

    // validation error
    if (!validation.isEmpty()) {
      return failedResponse(res, { message: validation.errors[0].msg });
    }

    const product = new Product({
      title,
      price,
      description,
      imageUrl,
      userId: req.user,
    });

    product
      .save() // mongoose
      .then(() => successResponse(res, {}, "Success storing product"))
      .catch((exception) =>
        failedResponse(res, exception, "Fail storing product")
      );
  }

  static async update(req, res) {
    const validation = validationResult(req);

    const { title, imageUrl, description, price } = req.body;

    // validation error
    if (!validation.isEmpty()) {
      return failedResponse(res, { message: validation.errors[0].msg });
    }

    Product.findById(req.params.id)
      .then((product) => {
        product.title = title;
        product.imageUrl = imageUrl;
        product.description = description;
        product.price = price;

        return product.save();
      })
      .then((result) =>
        successResponse(res, {}, "Successfully updated product")
      )
      .catch((exception) => failedResponse(res, exception));
  }

  static async destroy(req, res) {
    Product.findByIdAndDelete(req.params.id)
      .then(() => successResponse(res, {}, "Successfully deleted product"))
      .catch((exception) => failedResponse(res, exception));
  }
}

export default productController;
