import mongoose, { Document, model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

let BlogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "users",
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

BlogSchema.plugin(mongoosePaginate);
BlogSchema.plugin(aggregatePaginate);

export const blogModel: any = mongoose.model("blog", BlogSchema);
