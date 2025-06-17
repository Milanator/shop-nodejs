import Product from "../models/product.js";
import { getStaticUrl, successResponse } from "../utils.js";
import { validationResult } from "express-validator";

class productController {
  static index(req, res, next) {
    Product.find()
      .select("title imageUrl price")
      .populate("userId", "name")
      .then((products) => {
        products = products.map((p) => ({
          ...p._doc,
          imageUrl: getStaticUrl(req, `/${p.imageUrl}`),
        }));

        return successResponse(res, products);
      })
      .catch((exception) => next(new Error(exception)));
  }

  static show(req, res, next) {
    Product.findById(req.params.id)
      .then((product) => successResponse(res, product))
      .catch((exception) => next(new Error(exception)));
  }

  static store(req, res, next) {
    const validation = validationResult(req);

    const { title, price, description } = req.body;

    // validation error - go to general error
    if (!validation.isEmpty()) {
      throw new Error(validation.errors[0].msg);
    }

    const product = new Product({
      title,
      price,
      description,
      imageUrl: req.file.path,
      userId: req.user,
    });

    product
      .save() // mongoose
      .then(() => successResponse(res, {}, "Success storing product"))
      .catch((exception) => next(new Error(exception)));
  }

  static update(req, res, next) {
    const validation = validationResult(req);

    const { title, description, price } = req.body;

    // validation error - go to general error
    if (!validation.isEmpty()) {
      throw new Error(validation.errors[0].msg);
    }

    Product.findById(req.params.id)
      .then((product) => {
        product.title = title;
        product.description = description;
        product.price = price;

        if (req.file.path) {
          product.imageUrl = req.file.path;
        }

        return product.save();
      })
      .then((result) =>
        successResponse(res, {}, "Successfully updated product")
      )
      .catch((exception) => next(new Error(exception)));
  }

  static destroy(req, res, next) {
    Product.findByIdAndDelete(req.params.id)
      .then(() => successResponse(res, {}, "Successfully deleted product"))
      .catch((exception) => next(new Error(exception)));
  }
}

export default productController;
