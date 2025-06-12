import User from "../models/User.js";
import { successResponse, failedResponse } from "../utils.js";

class authController {
  static getAuthUser(req, res) {
    if (!req.session.authUser) {
      successResponse(res, null);
    }

    User.findById(req.session.authUser._id)
      .then((user) => successResponse(res, user))
      .catch((exception) => failedResponse(res, exception));
  }

  static login(req, res) {
    User.findOne({ email: req.body.email })
      .then((user) => {
        req.session.authUser = user;

        req.session.save(() => {
          successResponse(res, user);
        });
      })
      .catch((exception) => failedResponse(res, exception));
  }

  static logout(req, res) {
    req.session.destroy(() => successResponse(res, {}));
  }

  static register(req, res) {
    const { email, password, password_confirmation } = req.body;

    // not confirmed
    if (password !== password_confirmation) {
      return failedResponse(res, { message: "Heslá sa nezhodujú." });
    }

    User.findOne({ email })
      .then((user) => {
        // user exist
        if (user?._id) {
          return failedResponse(res, { message: "Používateľ už existuje." });
        }

        // new registration
        const newUser = new User({
          email,
          password,
          cart: { items: [] },
        });

        newUser.save();
      })
      .then((user) => successResponse(res, user))
      .catch((exception) => failedResponse(res, exception));
  }
}

export default authController;
