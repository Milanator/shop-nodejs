import Product from "../models/product.js";
import { deleteFile, getStaticUrl, successResponse } from "../utils.js";
import { validationResult } from "express-validator";
import { getPagination, getPaginationParams } from "../utils/pagination.js";

class productController {
  static index(req, res, next) {
    let count = undefined;

    const { per_page, offset } = getPaginationParams(req);

    Product.countDocuments()
      .then((productCount) => {
        count = productCount;

        return Product.find()
          .skip(offset)
          .limit(per_page)
          .select("title imageUrl price")
          .populate("userId", "name");
      })
      .then((products) => {
        products = products.map((p) => ({
          ...p._doc,
          imageUrl: getStaticUrl(req, `/${p.imageUrl}`),
        }));

        return successResponse(
          res,
          getPagination(req, products, count, per_page)
        );
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

        // updating image
        if (req.file.path) {
          deleteFile(product.imageUrl);

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
    Product.findById(req.params.id)
      .then((product) => {
        if (!product) {
          return next(new Error("Product not found"));
        }

        if (product.imageUrl) {
          deleteFile(product.imageUrl);
        }

        return Product.deleteOne({ _id: req.params.id, userId: req.user._id });
      })
      .then(() => successResponse(res, {}, "Successfully deleted product"))
      .catch((exception) => next(new Error(exception)));
  }
}

export default productController;
