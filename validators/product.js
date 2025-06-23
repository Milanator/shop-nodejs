import { body } from "express-validator";

export const storeRules = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("Názov musí mať aspoň 3 znaky")
    .trim(),

  body("price").isFloat().withMessage("Cena je číslo"),

  body("description")
    .isLength({ min: 3, max: 400 })
    .withMessage("Popis obsahuje min 3 a max 400 znakov"),
];
