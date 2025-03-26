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
            required: true,
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
        countryCode: {
            type: String,
            default: null,
        },
        phoneNumber: {
            type: String,
            default: null,
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
        address: {
            addressLine1: {
                type: String,
                default: "",
            },
            addressLine2: {
                type: String,
                default: "",
            },
            city: {
                type: String,
                default: "",
            },
            state: {
                type: String,
                default: "",
            },
            zipCode: {
                type: String,
                default: "",
            },
            location: {
                type: { type: String },
                coordinates: Array,
            },
        },
    },
    { timestamps: true }
);
UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(aggregatePaginate);
UserSchema.plugin(AutoIncrement, { inc_field: "userId" });


export const userModel: any = mongoose.model("user", UserSchema);
