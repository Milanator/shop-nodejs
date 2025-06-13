import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "./../models/User.js";
import transporter from "./../plugins/nodemailer.js";
import { successResponse, failedResponse } from "../utils.js";
import { FRONTEND_ORIGIN, PASSWORD_LIMIT } from "../constants.js";
import { validationResult } from "express-validator";

class authController {
  static getAuthUser(req, res) {
    if (!req.session.authUser) {
      return successResponse(res, null);
    }

    User.findById(req.session.authUser._id)
      .then((user) => successResponse(res, user))
      .catch((exception) => failedResponse(res, exception));
  }

  static getHashedPassword(password) {
    return bcrypt.hash(password, PASSWORD_LIMIT);
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
    const validation = validationResult(req);

    const { email, password, password_confirmation } = req.body;

    if (!validation.isEmpty()) {
      return failedResponse(res, { message: validation.errors[0].msg });
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
      .catch((exception) => failedResponse(res, exception));
  }

  static resetPasswordRequest(req, res) {
    return crypto.randomBytes(32, (exception, buffer) => {
      if (exception) {
        console.log(exception);

        return failedResponse(res, exception);
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
        .catch((exception) => failedResponse(res, exception));
    });
  }

  static resetPasswordNew(req, res) {
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
      .catch((exception) => failedResponse(res, exception));
  }
}

export default authController;
