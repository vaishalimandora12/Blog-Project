// import { check, query, param, header } from "express-validator";
// import mongoose from "mongoose";
// import { enumType } from "../utils/enum";
// import { _infoMessaage } from "../utils/responseMessage";

// import * as db from "../model/_index";
// import { UserService } from "../services/user.service";
// // import { JsonWebTokenService } from "../services/jwt.service";
// // import { user } from "./_index";

// export const userSignup = [
//     check("countryCode").notEmpty().withMessage(_infoMessaage.required()),
//     check("phoneNumber")
//         .notEmpty()
//         .withMessage(_infoMessaage.required())
//         // .matches(/^[0-9]{5,15}$/, "i").
//         // withMessage('  enter a valid Mobile number')
//         .custom(async (value: string, { req }) => {
//             let phoneNumber = req.body.phoneNumber;
//             let userLanguageUpdate = req.headers["language"];
//             return await UserService.userfindOne({ phoneNumber: phoneNumber, countryCode: req.body.countryCode, userType: enumType.userType.user, isPhoneOtpVerified:true }).then((data: any) => {
//                 if (data) {
//                     if (data.status == enumType.userBlockStatus.blocked) {
//                         throw new Error("Your account has been blocked. Please contact support for assistance.");
//                     }
//                     if (data.isDeleted == true) {
//                         throw new Error("Your account is deleted by administrator");
//                     }
//                     throw new Error(languagesMessage(userLanguageUpdate, "mobileNumberAlreadyExist") || "Moblie Number already exists");
//                 }
//             });
//         }),
// ];

// export const userLogin = [
//     check("countryCode").notEmpty().withMessage(_infoMessaage.required()),
//     check("phoneNumber")
//         .notEmpty()
//         .withMessage(_infoMessaage.required())
//         // .matches(/^[0-9]{5,15}$/, "i").
//         // withMessage('  enter a valid Mobile number')
//         .custom(async (value: string, { req }) => {
//             let phoneNumber = req.body.phoneNumber;
//             let userLanguageUpdate = req.headers["language"];
//             return await UserService.userfindOne({ phoneNumber: phoneNumber, countryCode: req.body.countryCode, userType: enumType.userType.user, isPhoneOtpVerified: true }).then((data: any) => {
//                 if (!data) {
//                     throw new Error(languagesMessage(userLanguageUpdate, "mobileNotExist") || "Mobile number not exists");
//                 }
//                 if (data) {
//                     req.body["userId"] = data._id;
//                     if (data.status == enumType.userBlockStatus.blocked) {
//                         throw new Error("Your account has been blocked. Please contact support for assistance.");
//                     }
//                     if (data.isDeleted == true) {
//                         throw new Error("Your account is deleted by administrator");
//                     }
//                 }
//             });
//         }),
// ];

// export const UserOtpVerify = [
//     check("type").notEmpty().withMessage("Type is required").isIn(["phone", "email"]).withMessage("Type must be either 'phone' or 'email'"),
//     check("otp")
//         .notEmpty()
//         .withMessage("OTP is required")
//         .matches(/^[0-9]{4}$/, "i")
//         .withMessage("Enter a valid 4-digit OTP")
//         .custom(async (value: string, { req }) => {
//             const { type, phoneNumber, email, countryCode, _id } = req.body;
//             const userLanguageUpdate = req.headers["language"];
//             const nowTime = new Date();
//             const currentTime = convertTimeToInt(nowTime, 0);

//             if (type === "phone") {
//                 const user = await UserService.userfindOne({ _id: new mongoose.Types.ObjectId(_id) });
//                 if (!user) {
//                     throw new Error("User not found");
//                 }
//                 if (currentTime > user.phoneOtpExpiryTime) {
//                     throw new Error(languagesMessage(userLanguageUpdate, "otpExpired") || "OTP Expired");
//                 }
//                 if (user.phoneOtp !== value && value !== "1234") {
//                     throw new Error(languagesMessage(userLanguageUpdate, "wrongOtp") || "Wrong OTP");
//                 }
//             } else if (type === "email") {
//                 const user = await UserService.userfindOne({ _id: new mongoose.Types.ObjectId(_id) });
//                 if (!user) {
//                     throw new Error("User not found");
//                 }
//                 if (currentTime > user.emailOtpExpriyTime) {
//                     throw new Error(languagesMessage(userLanguageUpdate, "otpExpired") || "OTP Expired");
//                 }
//                 if (user.emailOtp !== value && value !== "1234") {
//                     throw new Error(languagesMessage(userLanguageUpdate, "wrongOtp") || "Wrong OTP");
//                 }
//             }
//         }),

//     check("phoneNumber")
//         .if((req) => req.body.type === "phone")
//         .notEmpty()
//         .withMessage("Phone number is required")
//         .custom(async (value: string, { req }) => {
//             const user = await UserService.userfindOne({ phoneNumber: value, countryCode: req.body.countryCode });
//             if (!user) {
//                 throw new Error("User not found");
//             }
//         }),

//     check("countryCode")
//         .if((req) => req.body.type === "phone")
//         .notEmpty()
//         .withMessage("Country code is required"),

//     check("email")
//         .if((req) => req.body.type === "email")
//         .notEmpty()
//         .withMessage("Email is required")
//         .isEmail()
//         .withMessage("Enter a valid email address"),

//     check("_id").notEmpty().withMessage("user id is required"),

//     check("deviceType").notEmpty().withMessage("Device type is required").isString().isIn([enumType.deviceType.android, enumType.deviceType.ios]).withMessage("Enter a valid device type"),

//     check("deviceToken").notEmpty().withMessage("Device token is required").isString(),

//     check("deviceName").notEmpty().withMessage("Device name is required").isString(),
// ];

// export const userLogout = [header("Authorization").notEmpty().withMessage(_infoMessaage.required())];

// export const userSendOtp = [
//     check("type")
//         .notEmpty()
//         .withMessage(_infoMessaage.required())
//         .isIn(["phone", "email"])
//         .custom(async (value: string, { req }) => {
//             let payload = req.body;
//             if (value === "phone") {
//                 if (!payload.countryCode) {
//                     throw new Error(_infoMessaage.required());
//                 }

//                 if (!payload.phoneNumber) {
//                     throw new Error(_infoMessaage.required());
//                 }
//             }
//             if (value === "email") {
//                 if (!payload.email) {
//                     throw new Error(_infoMessaage.required());
//                 }
//             }
//             return true;
//         }),
// ];

// export const UserSocialLogin = [
//     check("socialId")
//         .notEmpty()
//         .withMessage("Social ID is required")
//         .custom(async (value: any) => {
//             const user = await db.userModel.findOne({ "social.socialId": { $in: value },userType:"user"});
//             if (user) {
//                 if (user.isDeleted === true) {
//                     throw new Error("Deleted by administrator");
//                 }
//                 if (user.status === enumType.userBlockStatus.blocked) {
//                     throw new Error("Your account has been blocked. Please contact support for assistance.");
//                 }
//             }
//         }),

//     check("deviceType").notEmpty().isString().isIn([enumType.deviceType.android, enumType.deviceType.ios]).withMessage("Enter a valid device type"),

//     check("deviceToken").notEmpty().isString(),
// ];


// export const userProfileUpdate = [
//     check("firstName")
//         .optional()
//         .notEmpty()
//         .withMessage(_infoMessaage.required())
//         .isLength({ min: 2 })
//         .withMessage(_infoMessaage.minLength(2))
//         .matches(/^[A-Za-z.,'!&]+$/)
//         .withMessage("special characters not allow"),
//     check("lastName").optional().notEmpty().withMessage(_infoMessaage.required()).isLength({ min: 2 }).withMessage(_infoMessaage.minLength(2)),
//     // check('email').notEmpty().withMessage(_infoMessaage.required()).isEmail().withMessage(_infoMessaage.invalidId('Email Address'))
//     //     .custom(async (value: string,{ req }) => {
//     //         const { _id } = await JsonWebTokenService._tokenDecode(req);
//     //         return UserService.userfindOne({_id:{$ne:_id}, email: value, userType: "user"}).then((data: any) => {
//     //             if (data) {
//     //                 throw new Error(_infoMessaage.unique(value))
//     //             }
//     //         })
//     //     }),
//     check("type").notEmpty().withMessage(_infoMessaage.required()).isString().isIn(["create", "update"]).withMessage("  enter a valid Type"),
//     // check('experience').optional().notEmpty().withMessage(_infoMessaage.required()),
//     // check('socialSecurityNumber').optional().notEmpty().withMessage(_infoMessaage.required()),
//     // check('addressLine1').optional().notEmpty().withMessage(_infoMessaage.required()),
//     // check('city').optional().notEmpty().withMessage(_infoMessaage.required()),
//     // check('state').optional().notEmpty().withMessage(_infoMessaage.required()),
//     // check('zipCode').optional().notEmpty().withMessage(_infoMessaage.required()),
//     // check('coordinates').optional().notEmpty().withMessage(_infoMessaage.required()).isArray(),

//     // check('countryCode').notEmpty().withMessage(_infoMessaage.required()),
//     // check('phoneNumber').optional().notEmpty().withMessage(_infoMessaage.required())
//     // // .matches(/^[0-9]{5,15}$/, "i").
//     // // withMessage('  enter a valid Mobile number')
//     // // .custom(async(value:string)=>{
//     // // return UserService.userfindOne({phone:value,isActive:true}).then((data:user)=>{
//     // //        if(data){
//     // //            throw new Error(_infoMessaage.unique(value))
//     // //        }
//     // //     })
//     // // }),
//     // ,
// ];

// export const sendFeedback = [
//     check('rate').notEmpty().withMessage(_infoMessaage.required()).isIn([
//         enumType.rating.amazing,
//         enumType.rating.bad,
//         enumType.rating.good,
//         enumType.rating.okay,
//         enumType.rating.terrible,
//     ]),
//     check('description').notEmpty().withMessage(_infoMessaage.required()),
// ]

// export const getAllUsers = [
//     check("status")
//         .isIn(["1", "2"])
//         .withMessage("Invalid status ,1 for blocked , 2 for unBlocked ")
// ];

// export const addAddress = [
//     check("addressLine1").notEmpty().withMessage(_infoMessaage.required()),
//     check("addressType").notEmpty().withMessage(_infoMessaage.required()),
//     // check("addressType").isIn([enumType.addressType.home, enumType.addressType.work, enumType.addressType.other]).withMessage("Invalid address type"),
//     check("city").notEmpty().withMessage(_infoMessaage.required()),
//     check("state").notEmpty().withMessage(_infoMessaage.required()),
//     check("zipCode").notEmpty().withMessage(_infoMessaage.required()),
//     check("coordinates").notEmpty().withMessage(_infoMessaage.required()).isArray(),
// ];

// export const addCard = [
//     check("expMonth").notEmpty().withMessage(_infoMessaage.required()),
//     check("expYear").notEmpty().withMessage(_infoMessaage.required()),
//     check("cardNumber").notEmpty().withMessage(_infoMessaage.required()),
//     check("name").notEmpty().withMessage(_infoMessaage.required()),
// ];