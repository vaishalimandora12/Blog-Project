import * as db from "../model/_index";
import { user } from "../interface/user.interface"; 
import bcryptjs from "bcryptjs";
class sessionService {

    async create(payload: any): Promise<any> {
        try {
            return await db.sessionModel.create(payload);
        } catch (error) {
            throw error;
        }
    }


    async find(): Promise<user[]> {
        try {
            return await db.sessionModel.find();
        } catch (error) {
            throw error;
        }
    }

    async deleteOne(userId: string): Promise<any> {
        try {
            return await db.sessionModel.deleteOne({ _id: userId });
        } catch (error) {
            throw error;
        }
    }

    async updateOne(query:any, payload: any): Promise<any> {
        try {
            return await db.sessionModel.updateOne( query, payload, { upsert: true });
        } catch (error) {
            throw error;
        }
    }

    async findOne(query: any): Promise<any> {
        try {
            return await db.sessionModel.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    async deleteSession(query: Object): Promise<any> {
        try {
            return await db.sessionModel.deleteMany(query);
        } catch (error) {
            throw error;
        }
    }
}

export const SessionService = new sessionService();
