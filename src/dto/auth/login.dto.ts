import { body } from "express-validator";

export const loginDto = [
  body("email").isEmail(),
  body("password").notEmpty(),
];