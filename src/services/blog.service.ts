import * as db from "../model/_index";

class blogService {

    async create(payload: any) {
        try {
            return await db.blogModel.create(payload);
        } catch (error) {
            throw error;
        }
    }

    async aggregatePaginate(aggregate: any[], option: { page: Number; limit: Number }) {
        return new Promise(async (resolve, reject) => {
            try {
                var myAggregate = db.blogModel.aggregate(aggregate);
                var data = await db.blogModel.aggregatePaginate(myAggregate, option);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }


    async find(payload:Object){
        try {
            return await db.blogModel.find(payload);
        } catch (error) {
            throw error;
        }
    }

    async deleteOne(blogId: any){
        try {
            return await db.blogModel.deleteOne(blogId);
        } catch (error) {
            throw error;
        }
    }

    async deleteMany(payload: Object){
        try {
            return await db.blogModel.deleteMany(payload);
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

    async findUserBloag(payload?: any, option?: { page: Number; limit: Number }, find?: any) {
        let filter: any = [
            {
                $match:payload
            },
            {
                $sort: { createdAt: -1 },
            },
        ];

        return await this.aggregatePaginate(filter, option);
    }

}

export const BlogService = new blogService();
