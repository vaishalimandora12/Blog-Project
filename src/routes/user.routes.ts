import { Router } from "express";
import { errorResponse } from "../middleware/validation-error.middleware";
import * as validations from "../validations/_index";
import * as controllers from "../controller/_index";

const router: Router = Router();

export const userRoutes = [
    // Authentication
    router.post("/login", validations.user.userLogin, errorResponse, controllers.user.AuthenticationController.signIn),
    router.post("/signup", validations.user.userSignup, errorResponse, controllers.user.AuthenticationController.signUp),
    router.post("/refreshToken",validations.user.refereshToken,errorResponse,controllers.user.AuthenticationController.refreshToken),

    //Blog Management
    router.post("/private/createBlog",validations.user.createBlog,errorResponse,controllers.user.BlogController.createBlog),
    router.get("/private/getMyBlogs",controllers.user.BlogController.getMyBlogs),
    router.put("/private/editBlog/:id",validations.user.createBlog,errorResponse,controllers.user.BlogController.editBlog),
    router.delete("/private/deleteBlog/:id",controllers.user.BlogController.deleteBlog),
    router.get("/private/getAllUserBlogs",controllers.user.BlogController.getAllUserBlogs),
];
