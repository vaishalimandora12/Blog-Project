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

    async getMyBlogs(req: Request, res: Response) {
        try {
            const activeUser = await JsonWebTokenService._tokenDecode(req);
            let querys: any = req.query;
            let query = {
                page: parseInt(querys.page) || 1,
                limit: parseInt(querys.limit) || 10,
            };
            const data = await BlogService.findUserBloag({userId:activeUser._id},query)
            return res.status(_httpStatusService.status.OK).json({
                status: 200,
                success: true,
                data:data,
                message: "Success"
            });
        } catch (error: any) {
            let resObj = {
                status: _httpStatusService.status.serverError,
                message: error.message,
            };
            return res.status(_httpStatusService.status.serverError).json(resObj);
        }
    }

    async editBlog(req: Request, res: Response) {
        try {
            const id=req.params.id
            const activeUser = await JsonWebTokenService._tokenDecode(req);
            const { title, author, content } = req.body;
            const refData = {
                title: title,
                author: author,
                content: content,
            };
            const data = await BlogService.updateOne({_id:new mongoose.Types.ObjectId(id)},refData)
            return res.status(_httpStatusService.status.OK).json({
                status: 200,
                success: true,
                data:data,
                message: "Blog updated successfully"
            });
        } catch (error: any) {
            let resObj = {
                status: _httpStatusService.status.serverError,
                message: error.message,
            };
            return res.status(_httpStatusService.status.serverError).json(resObj);
        }
    }

    async deleteBlog(req: Request, res: Response) {
        try {
            const id = req.params.id
            const activeUser = await JsonWebTokenService._tokenDecode(req);
            await BlogService.deleteOne({_id:new mongoose.Types.ObjectId(id)})
            return res.status(_httpStatusService.status.OK).json({
                status: 200,
                success: true,
                message: "Blog deleted successfully"
            });
        } catch (error: any) {
            let resObj = {
                status: _httpStatusService.status.serverError,
                message: error.message,
            };
            return res.status(_httpStatusService.status.serverError).json(resObj);
        }
    }

    async getAllUserBlogs(req: Request, res: Response) {
        try {
            const activeUser = await JsonWebTokenService._tokenDecode(req);
            let querys: any = req.query;
            let query = {
                page: parseInt(querys.page) || 1,
                limit: parseInt(querys.limit) || 10,
            };
            const data = await BlogService.findUserBloag({},query)
            return res.status(_httpStatusService.status.OK).json({
                status: 200,
                success: true,
                data:data,
                message: "Success"
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

