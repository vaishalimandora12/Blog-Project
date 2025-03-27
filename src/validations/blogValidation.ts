import { body } from "express-validator";
import { _infoMessaage } from "../utils/responseMessage";

export const createBlog = [
    body("title").notEmpty().withMessage(_infoMessaage.required()),
    body("content").notEmpty().withMessage(_infoMessaage.required()),
    body("author").notEmpty().withMessage(_infoMessaage.required())
];
