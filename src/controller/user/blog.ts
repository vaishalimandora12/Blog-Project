import mongoose from 'mongoose';
import { Request, Response } from "express";
import { _httpStatusService } from "../../utils/_httpStatus";
import { UserService } from "../../services/user.service";
import { BlogService } from '../../services/blog.service';
import { JsonWebTokenService } from "../../services/jwt.service";


class blogController {
    async createBlog(req: Request, res: Response) {
        try {
            const activeUser = await JsonWebTokenService._tokenDecode(req);
            console.log(activeUser)
            const { title, author, content } = req.body;
            const refData = {
                userId: activeUser._id,
                title: title,
                author: author,
                content: content,
            };
            const data = await BlogService.create(refData)
            return res.status(_httpStatusService.status.OK).json({
                status: 200,
                success: true,
                data:data,
                message: "Blog added successfully"
            });
        } catch (error: any) {
            let resObj = {
                status: _httpStatusService.status.serverError,
                message: error.message,
            };
            return res.status(_httpStatusService.status.serverError).json(resObj);
        }
    }



    
}

export const BlogController = new blogController();

