import { body } from "express-validator";
export const loginValidation = [
    body('email', "Pochta notog'ri").isEmail(),
    body('password', "parol 5tadan kam bomasligi kerak").isLength({min:5}),
]

export const registerValidation = [
    body('email', "Pochta notog'ri").isEmail(),
    body('password', "parol 5tadan kam bomasligi kerak").isLength({min: 5}),
    body('fullName', "Ismingizni kiriting").isLength({min: 3}),
    body('avatarUrl', "Noto'g'ri rasm").optional().isURL(),
]

export const postCreateValidation = [
    body('title', "Blog sarlavhasi").isLength({ min: 3}).isString(),
    body('text', "Blog text yozing").isLength({min: 3}).isString(),
    body('tags', "Blog teglar yozing").optional().isString(),
    body('rasmUrl', "Noto'g'ri rasm").optional().isURL(),
];