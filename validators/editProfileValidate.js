import { check } from "express-validator";

export const editProfileValidate = [
    check("email").optional(),
    check("name").optional(),
    check("password").optional(),
];
