import { Router } from "express";
import { errorResponse } from "../middleware/validation-error.middleware";
// import * as validations from "../validations/_index";
// import * as controllers from "../controller/_index";

const router: Router = Router();

export const userRoutes = [
    // Authentication
    // router.post("/login", validations.user.userLogin, errorResponse, controllers.user.AuthenticationController.signIn),
    // router.post("/signup", validations.user.userSignup, errorResponse, controllers.user.AuthenticationController.signUp),
    // router.post("/otpVerify", validations.user.UserOtpVerify, errorResponse, controllers.user.AuthenticationController.otpVerification),
    // router.post("/sendOtp", validations.user.userSendOtp, errorResponse, controllers.user.AuthenticationController.sendOtp),
    // router.post("/private/logout", validations.user.userLogout, errorResponse, controllers.user.AuthenticationController.userLogout),
    // router.post("/private/deleteAccount", controllers.user.AuthenticationController.deleteAccount),

    // // Social Authentication
    // router.post("/socialLogin", validations.user.UserSocialLogin, errorResponse, controllers.user.AuthenticationController.userSocialLogin),

    // // Profile Update
    // router.post("/private/createUpdateProfile", validations.user.userProfileUpdate, errorResponse, controllers.user.AuthenticationController.createUpdateProfile),
    // router.put("/private/removeProfilePhoto", controllers.user.AuthenticationController.removeProfilePhoto),

    // //CMS Management
    // router.get("/getAllFaq", controllers.user.WebPageUser.getAllFaq),
    // router.post("/private/sendFeedback", validations.user.sendFeedback, errorResponse, controllers.user.AuthenticationController.sendFeedback),

    // // Notification Management
    // router.get("/private/getNotifications", controllers.user.AuthenticationController.getNotifications),

    // // Address Management
    // router.post("/private/addAddress", validations.user.addAddress, errorResponse, controllers.user.AuthenticationController.addAddress),
    // router.put("/private/updateAddress/:id", validations.user.addAddress, errorResponse, controllers.user.AuthenticationController.updateAddress),
    // router.delete("/private/deleteAddress/:id", controllers.user.AuthenticationController.deleteAddress),
    // router.get("/private/getAllAddress", controllers.user.AuthenticationController.getAllAddress),

    // // saved card Management
    // router.post("/private/addCard", validations.user.addCard, errorResponse, controllers.user.AuthenticationController.addCard),
    // router.put("/private/updateCard/:id", validations.user.addCard, errorResponse, controllers.user.AuthenticationController.updateCard),
    // router.delete("/private/deleteCard/:id", controllers.user.AuthenticationController.deleteCard),
    // router.get("/private/getAllSavedCards", controllers.user.AuthenticationController.getAllSavedCards),
    // router.put("/private/defaultCard/:id", controllers.user.AuthenticationController.defaultCard),

    // //Booking management
    // router.post("/private/bookService", validations.user.bookService, errorResponse, controllers.user.UserBookingController.bookService),
    // router.post("/private/bookingPayment/:id", validations.user.bookingPayment, errorResponse, controllers.user.UserBookingController.bookingPayment),
];
