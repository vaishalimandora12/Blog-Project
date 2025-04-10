import * as db from "../model/_index";
import { user } from "../interface/user.interface"; 
import bcryptjs from "bcryptjs";
class userService {

    async create(payload: any): Promise<any> {
        try {
            const salt: any = await bcryptjs.genSalt(10);
            if (payload["password"]) {
                payload["password"] = await bcryptjs.hash(payload["password"], salt);
            }
            return await db.userModel.create(payload);
        } catch (error) {
            throw error;
        }
    }


    async find(): Promise<user[]> {
        try {
            return await db.userModel.find();
        } catch (error) {
            throw error;
        }
    }

    async deleteOne(userId: string): Promise<any> {
        try {
            return await db.userModel.deleteOne({ _id: userId });
        } catch (error) {
            throw error;
        }
    }

    async updateOne(query:any, payload: any): Promise<any> {
        try {
            return await db.userModel.updateOne({ _id: query }, payload);
        } catch (error) {
            throw error;
        }
    }

    async findOne(query: any): Promise<any> {
        try {
            return await db.userModel.findOne(query);
        } catch (error) {
            throw error;
        }
    }
}

export const UserService = new userService();
