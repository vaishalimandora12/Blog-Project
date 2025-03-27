import { check } from "express-validator";
import mongoose from "mongoose";
import { enumType } from "../utils/enum";
import { _infoMessaage } from "../utils/responseMessage";
import { UserService } from "../services/user.service";
import bcryptjs from "bcryptjs";

export const userSignup = [
    check("firstName")
        .notEmpty().withMessage(_infoMessaage.required())
        .isAlpha().withMessage("First name must contain only letters"),

    check("lastName")
        .notEmpty().withMessage(_infoMessaage.required())
        .isAlpha().withMessage("Last name must contain only letters"),

    check("deviceToken")
        .notEmpty().withMessage(_infoMessaage.required()),

    check("deviceType")
        .notEmpty().withMessage(_infoMessaage.required())
        .isIn([enumType.deviceType.android, enumType.deviceType.ios])
        .withMessage("Invalid device type. Allowed values: 'android', 'ios'"),

    check("deviceName")
        .notEmpty().withMessage(_infoMessaage.required()),
    check("email")
        .notEmpty().withMessage(_infoMessaage.required())
        .isEmail().withMessage("Invalid email format")
        .custom(async (value: string, { req }) => {
            let email = req.body.email;
            return await UserService.findOne({ email: email, userType: enumType.userType.user })
                .then((data: any) => {
                    if (data) {
                        if (data.status == enumType.userBlockStatus.blocked) {
                            throw new Error("Your account has been blocked.");
                        }
                        throw new Error("Email already exists");
                    }
                });
        }),

    check("password")
        .notEmpty().withMessage(_infoMessaage.required())
];



export const userLogin = [
    check("email")
        .notEmpty().withMessage(_infoMessaage.required())
        .isEmail().withMessage("Invalid email format")
        .custom(async (value: string, { req }) => {
            let email = req.body.email;
            const user = await UserService.findOne({ email: email, userType: enumType.userType.user });
            if (!user) {
                throw new Error("Email not found");
            }
            if (user.status == enumType.userBlockStatus.blocked) {
                throw new Error("Your account has been blocked.");
            }
        }),
    
    check("password")
        .notEmpty()
        .custom(async (value, { req }) => {
            const email = req.body.email.toLowerCase();
            const user = await UserService.findOne({ email:email });
            if (!user) {
                throw new Error("Invalid email or password");
            }

            const isPasswordValid = await bcryptjs.compare(value, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid Password");
            }
        }),
    check("deviceToken")
        .notEmpty().withMessage(_infoMessaage.required()),

    check("deviceType")
        .notEmpty().withMessage(_infoMessaage.required())
        .isIn([enumType.deviceType.android, enumType.deviceType.ios])
        .withMessage("Invalid device type. Allowed values: 'android', 'ios'"),

    check("deviceName")
        .notEmpty().withMessage(_infoMessaage.required())
];


export const refereshToken = [

    check("refreshToken")
        .notEmpty().withMessage(_infoMessaage.required())
];