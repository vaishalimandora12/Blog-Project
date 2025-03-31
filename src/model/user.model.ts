import mongoose, { Document, model, Schema } from "mongoose";
import { enumType } from "../utils/enum";

import Inc from "mongoose-sequence";
import mongoosePaginate, { paginate } from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const AutoIncrement = Inc(mongoose);
let UserSchema = new mongoose.Schema(
    {
        userType: {
            type: String,
            enum: [enumType.userType.user, enumType.userType.admin],
        },
        firstName: {
            type: String,
            default: null,
        },
        lastName: {
            type: String,
            default: null,
        },
        password: {
            type: String,
            default: null,
        },
        email: {
            type: String,
            lowercase: true,
            // set: (value) => value.toLowerCase(),
        },
        userId: {
            type: Number,
        },
        socialLogin: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: [enumType.userBlockStatus.blocked, enumType.userBlockStatus.unBlocked],
            default: enumType.userBlockStatus.unBlocked,
        },
    },
    { timestamps: true }
);
UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(aggregatePaginate);
UserSchema.plugin(AutoIncrement, { inc_field: "userId" });


export const userModel: any = mongoose.model("user", UserSchema);
