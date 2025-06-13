import { body } from "express-validator";
import User from "./../models/User.js";

export const registerRules = [
  // async validation
  body("email")
    .normalizeEmail()
    .custom((email, { req }) =>
      User.findOne({ email }).then((user) => {
        // user exist
        if (user) {
          return Promise.reject("Používateľ s rovnakým emailom už existuje.");
        }
      })
    ),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Heslo musí mať aspoň 6 znakov"),

  body("password_confirmation")
    .trim()
    .custom((password_confirmation, { req }) => {
      if (password_confirmation !== req.body.password) {
        throw new Error("Heslá sa nezhodujú.");
      }

      return true;
    }),
];
