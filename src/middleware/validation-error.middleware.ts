import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const errorResponse = (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: 422,
                message: "  validate all fields ",
                errors: errors.array({ onlyFirstError: true }),
            });
        } else {
            next();
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};
