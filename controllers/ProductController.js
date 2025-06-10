import Product from "../models/Product.js";
import Transformer from "../transformers/Product.js";
import { successResponse, failedResponse } from "../utils.js";

class productController {
  static async index(req, res) {
    try {
      const data = await Product.findAll();

      successResponse(res, Transformer.get(data));
    } catch (exception) {
      failedResponse(res, exception);
    }
  }

  static async show(req, res) {
    req.user
      .getProducts({ where: { id: req.params.id } })
      .then((products) => {
        const product = products[0];

        if (!product) {
          successResponse(res, {});
        }

        successResponse(res, Transformer.first(product));
      })
      .catch((exception) => {
        failedResponse(res, exception);
      });
  }

  static async store(req, res) {
    req.user
      .createProduct(req.body, {
        fields: ["title", "imageUrl", "description", "price", "userId"],
      })
      .then(() => {
        successResponse(res, {}, "Successfully stored product");
      })
      .catch((exception) => {
        successResponse(res, exception, "Successfully stored product");
      });
  }

  static async update(req, res) {
    try {
      const { title, imageUrl, description, price } = req.body;

      await Product.update(
        {
          title,
          imageUrl,
          description,
          price,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      successResponse(res, {}, "Successfully updated product");
    } catch (exception) {
      failedResponse(res, exception);
    }
  }

  static async destroy(req, res) {
    try {
      await Product.destroy({
        where: {
          id: req.params.id,
        },
      });

      successResponse(res, {}, "Successfully deleted product");
    } catch (exception) {
      failedResponse(res, exception);
    }
  }
}

export default productController;
