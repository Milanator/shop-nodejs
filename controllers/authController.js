import { successResponse, failedResponse } from "../utils.js";

class authController {
  static login(req, res) {
    req.session.authUser = { user: { name: req.user.name } };

    successResponse(res, { message: "Success logged in" });
  }
}

export default authController;
