import { successResponse, failedResponse } from "../utils.js";

class orderController {
  static index(req, res) {
    req.user
      .getOrders()
      .then((orders) => successResponse(res, orders))
      .catch((exception) => failedResponse(res, exception));
  }

  static store(req, res) {
    req.user
      .addOrder()
      .then((result) => successResponse(res, {}))
      .catch((exception) => failedResponse(res, exception));
  }
}

export default orderController;
