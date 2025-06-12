import User from "../models/User.js";
import { successResponse, failedResponse } from "../utils.js";

const USER_ID = "68497a6dcf35d45b85a9d448";

class authController {
  static getAuthuser(req, res) {
    User.findById(req.session.authUser._id)
      .then((user) => successResponse(res, user))
      .catch((exception) => failedResponse(res, exception));
  }

  static login(req, res) {
    User.findById(USER_ID)
      .then((user) => {
        req.session.authUser = user;

        req.session.save(() => {
          successResponse(res, req.session.authUser);
        });
      })
      .catch((exception) => failedResponse(res, exception));
  }

  static logout(req, res) {
    req.session.destroy(() => successResponse(res, {}));
  }
}

export default authController;
