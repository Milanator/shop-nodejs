import Model from "./../models/Product.js";
import Transformer from "./../transformers/Product.js";
import { successResponse, failedResponse } from "./../utils.js";

class ProductController {
  static async index(req, res) {
    try {
      let data = await new Model().get();
      data = new Transformer().get(data);

      successResponse(res, data);
    } catch (exception) {
      failedResponse(res, exception);
    }
  }

  static async show(req, res) {
    try {
      let data = await new Model().first(req.params.id);
      data = new Transformer().first(data);

      successResponse(res, data);
    } catch (exception) {
      failedResponse(res, exception);
    }
  }

  static async store(req, res) {
    try {
      await new Model().store(req.body);

      successResponse(res, {}, "Successfully stored product");
    } catch (exception) {
      failedResponse(res, exception);
    }
  }

  static async update(req, res) {
    try {
      await new Model().update(req.body, req.params.id);

      successResponse(res, {}, "Successfully updated product");
    } catch (exception) {
      failedResponse(res, exception);
    }
  }

  static async destroy(req, res) {
    try {
      await new Model().delete(req.params.id);

      successResponse(res, {}, "Successfully deleted product");
    } catch (exception) {
      failedResponse(res, exception);
    }
  }
}

export default ProductController;
