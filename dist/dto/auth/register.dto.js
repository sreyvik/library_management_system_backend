import { body } from "express-validator";
export const registerDTO = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),
    body("email")
        .isEmail()
        .withMessage("Valid email required"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];
