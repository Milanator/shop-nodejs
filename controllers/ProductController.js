import Model from "./../models/Product.js";
import Transformer from "./../transformers/Product.js";
import { successResponse, failedResponse } from "./../utils.js";

class ProductController {
  static async index(req, res) {
    try {
      let data = await Model.findAll();
      data = Transformer.get(data);

      successResponse(res, data);
    } catch (exception) {
      failedResponse(res, exception);
    }
  }

  static async show(req, res) {
    try {
      let data = await Model.findOne({ where: { id: req.params.id } });

      data = Transformer.first(data);

      successResponse(res, data);
    } catch (exception) {
      failedResponse(res, exception);
    }
  }

  static async store(req, res) {
    try {
      await Model.create(req.body, {
        fields: ["title", "image_url", "description", "price"],
      });

      successResponse(res, {}, "Successfully stored product");
    } catch (exception) {
      failedResponse(res, exception);
    }
  }

  static async update(req, res) {
    try {
      const { title, image_url, description, price } = req.body;

      await Model.update(
        {
          title,
          image_url,
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
      await Model.destroy({
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

export default ProductController;
