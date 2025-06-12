import bcrypt from "bcryptjs";
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
        if (!user) {
          throw new Error("Nesprávny email alebo heslo");
        }

        return bcrypt
          .compare(req.body.password, user.password)
          .then((doMatch) => {
            if (!doMatch) {
              throw new Error("Nesprávny email alebo heslo");
            }

            req.session.authUser = user;

            return req.session.save(() => {
              successResponse(res, user);
            });
          });
      })
      .catch((exception) => failedResponse(res, exception));
  }

  static logout(req, res) {
    req.session.destroy(() => successResponse(res, {}));
  }

  static register(req, res) {
    const PASSWORD_LIMIT = 12;

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

        return bcrypt.hash(password, PASSWORD_LIMIT).then((hashedPassword) => {
          // new registration
          const newUser = new User({
            email,
            password: hashedPassword,
            cart: { items: [] },
          });

          newUser.save();
        });
      })
      .then((user) => successResponse(res, user))
      .catch((exception) => failedResponse(res, exception));
  }
}

export default authController;
