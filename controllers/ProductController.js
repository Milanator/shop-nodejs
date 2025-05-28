import Product from "./../models/Product.js";
import { successResponse, failedResponse } from "./../utils.js";

class ProductController {
  static async index(req, res) {
    try {
      const data = await new Product().get();

      successResponse(res, data);
    } catch (exception) {
      failedResponse(res, exception);
    }
  }

  static async show(req, res) {
    try {
      const data = await new Product().first(req.params.id);

      successResponse(res, data);
    } catch (exception) {
      failedResponse(res, exception);
    }
  }

  static async destroy(req, res) {
    try {
      await new Product().delete(req.params.id);

      successResponse(res, {}, "Successfully deleted product");
    } catch (exception) {
      failedResponse(res, exception);
    }
  }
}

export default ProductController;
