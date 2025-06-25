import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "./../models/User.js";
import transporter from "./../plugins/nodemailer.js";
import { successResponse } from "../utils/common.js";
import { FRONTEND_ORIGIN, PASSWORD_LIMIT } from "../constants.js";
import { validationResult } from "express-validator";

class authController {
  static getAuthUser(req, res, next) {
    if (!req.session.authUser) {
      return successResponse(res, null);
    }

    User.findById(req.session.authUser._id)
      .then((user) => successResponse(res, user))
      .catch((exception) => next(new Error(exception)));
  }

  static getHashedPassword(password) {
    return bcrypt.hash(password, PASSWORD_LIMIT);
  }

  static login(req, res, next) {
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
      .catch((exception) => next(new Error(exception)));
  }

  static logout(req, res, next) {
    req.session.destroy(() => successResponse(res, {}));
  }

  static register(req, res, next) {
    const validation = validationResult(req);

    const { email, password } = req.body;

    // validation error - go to general error
    if (!validation.isEmpty()) {
      throw new Error(validation.errors[0].msg);
    }

    return authController
      .getHashedPassword(password)
      .then((hashedPassword) => {
        // new registration
        const newUser = new User({
          email,
          password: hashedPassword,
          cart: { items: [] },
        });

        newUser.save();

        // send email
        return transporter.sendMail({
          from: '"Milan" <info@imperioom.sk>',
          to: "navratil.milann@gmail.com",
          subject: "Registrácia",
          html: "<b>Registrácia bola úspešná</b>",
        });
      })
      .then(() => successResponse(res, {}))
      .catch((exception) => next(new Error(exception)));
  }

  static resetPasswordRequest(req, res, next) {
    return crypto.randomBytes(32, (exception, buffer) => {
      if (exception) {
        return next(new Error(exception));
      }

      const token = buffer.toString("hex");

      return User.findOne({ email: req.body.email })
        .then((user) => {
          if (!user) {
            throw new Error("Používateľ s emailom neexistuje");
          }

          user.resetToken = token;
          user.resetTokenExpiration = Date.now() + 3600000;

          return user.save();
        })
        .then((user) => {
          return transporter.sendMail({
            from: '"Milan" <info@imperioom.sk>',
            to: user.email,
            subject: "Reset hesla",
            html: `
            Požiadal si o reset hesla. Po kliku na tento <a href="${FRONTEND_ORIGIN}/reset-password/new?token=${token}">link</a> vyplň formulár.
            `,
          });
        })
        .then(() => successResponse(res, {}))
        .catch((exception) => next(new Error(exception)));
    });
  }

  static resetPasswordNew(req, res, next) {
    User.findOne({
      resetToken: req.body.token,
      resetTokenExpiration: { $gt: Date.now() },
    })
      .then((user) => {
        if (!user) {
          throw new Error("Token expiroval.");
        }

        if (req.body.password !== req.body.password_confirmation) {
          throw new Error("Heslá sa nezhodujú.");
        }

        return authController
          .getHashedPassword(req.body.password)
          .then((hashedPassword) => {
            user.password = hashedPassword;
            user.resetToken = undefined;
            user.resetTokenExpiration = undefined;

            return user.save();
          });
      })
      .then(() => successResponse(res, {}))
      .catch((exception) => next(new Error(exception)));
  }
}

export default authController;
