import { body } from "express-validator";

export const registerRules = [
  body("password")
    .isLength({ min: 6 })
    .withMessage("Heslo musí mať aspoň 6 znakov"),

  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Heslá sa nezhodujú.");
    }

    return true;
  }),
];
