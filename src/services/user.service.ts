import * as db from "../model/_index";
import { user } from "../interface/user.interface"; 

class userService {
    async createUser(payload: user): Promise<user> { 
        try {
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
