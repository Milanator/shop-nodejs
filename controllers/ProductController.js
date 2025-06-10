import Product from "../models/product.js";
import Transformer from "./../transformers/product.js";
import { successResponse, failedResponse } from "../utils.js";

class productController {
  // static async index(req, res) {
  //   try {
  //     const data = await Product.findAll();

  //     successResponse(res, Transformer.get(data));
  //   } catch (exception) {
  //     failedResponse(res, exception);
  //   }
  // }

  // static async show(req, res) {
  //   req.user
  //     .getProducts({ where: { id: req.params.id } })
  //     .then((products) => {
  //       const product = products[0];

  //       if (!product) {
  //         successResponse(res, {});
  //       }

  //       successResponse(res, Transformer.first(product));
  //     })
  //     .catch((exception) => {
  //       failedResponse(res, exception);
  //     });
  // }

  static async store(req, res) {
    const { title, price, imageUrl, description } = req.body;
    const product = new Product(title, price, description, imageUrl);

    product
      .save()
      .then(() => {
        successResponse(res, {}, "Success storing product");
      })
      .catch((exception) => {
        successResponse(res, exception, "Fail storing product");
      });
  }

  // static async update(req, res) {
  //   try {
  //     const { title, imageUrl, description, price } = req.body;

  //     await Product.update(
  //       {
  //         title,
  //         imageUrl,
  //         description,
  //         price,
  //       },
  //       {
  //         where: {
  //           id: req.params.id,
  //         },
  //       }
  //     );

  //     successResponse(res, {}, "Successfully updated product");
  //   } catch (exception) {
  //     failedResponse(res, exception);
  //   }
  // }

  // static async destroy(req, res) {
  //   try {
  //     await Product.destroy({
  //       where: {
  //         id: req.params.id,
  //       },
  //     });

  //     successResponse(res, {}, "Successfully deleted product");
  //   } catch (exception) {
  //     failedResponse(res, exception);
  //   }
  // }
}

export default productController;
