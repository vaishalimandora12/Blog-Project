import { userSignup ,userLogin,refereshToken} from "./userValidation";
import { createBlog } from "./blogValidation"

export const user = {
    userSignup,
    userLogin,
    createBlog,
    refereshToken
};


