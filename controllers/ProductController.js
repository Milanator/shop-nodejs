import Product from "../models/product.js";
import { successResponse } from "../utils.js";
import { validationResult } from "express-validator";

class productController {
  static async index(req, res, next) {
    Product.find()
      .select("title imageUrl price")
      .populate("userId", "name")
      .then((products) => successResponse(res, products))
      .catch((exception) => next(new Error(exception)));
  }

  static async show(req, res, next) {
    Product.findById(req.params.id)
      .then((product) => successResponse(res, product))
      .catch((exception) => next(new Error(exception)));
  }

  static async store(req, res, next) {
    const validation = validationResult(req);

    const { title, price, description } = req.body;

    const file = req.file;
    console.log(req.file);
    // validation error - go to general error
    if (!validation.isEmpty()) {
      throw new Error(validation.errors[0].msg);
    }

    const product = new Product({
      title,
      price,
      description,
      userId: req.user,
    });

    product
      .save() // mongoose
      .then(() => successResponse(res, {}, "Success storing product"))
      .catch((exception) => next(new Error(exception)));
  }

  static async update(req, res, next) {
    const validation = validationResult(req);

    const { title, imageUrl, description, price } = req.body;

    // validation error - go to general error
    if (!validation.isEmpty()) {
      throw new Error(validation.errors[0].msg);
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
      .catch((exception) => next(new Error(exception)));
  }

  static async destroy(req, res, next) {
    Product.findByIdAndDelete(req.params.id)
      .then(() => successResponse(res, {}, "Successfully deleted product"))
      .catch((exception) => next(new Error(exception)));
  }
}

export default productController;
