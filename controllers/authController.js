import { successResponse, failedResponse } from "../utils.js";

class authController {
  static login(req, res) {
    successResponse(res, { message: "Success logged in" });
  }
}

export default authController;
