import * as db from "../model/_index";

class blogService {

    async create(payload: any) {
        try {
            return await db.blogModel.create(payload);
        } catch (error) {
            throw error;
        }
    }


    async find(){
        try {
            return await db.blogModel.find();
        } catch (error) {
            throw error;
        }
    }

    async deleteOne(userId: string){
        try {
            return await db.blogModel.deleteOne({ _id: userId });
        } catch (error) {
            throw error;
        }
    }

    async updateOne(query:any, payload: any) {
        try {
            return await db.blogModel.updateOne( query, payload, { upsert: true });
        } catch (error) {
            throw error;
        }
    }

    async findOne(query: any) {
        try {
            return await db.blogModel.findOne(query);
        } catch (error) {
            throw error;
        }
    }
}

export const BlogService = new blogService();
