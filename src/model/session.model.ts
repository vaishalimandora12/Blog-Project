
import mongoose, { Schema } from "mongoose";
import { enumType } from "../utils/enum";

let sessionSchema = new mongoose.Schema(
    {
        deviceName: {
            type: String,
            default: null,
        },
        deviceType: {
            type: String,
            enum: [enumType.deviceType.android, enumType.deviceType.ios,enumType.deviceType.android],
            required: true,
        },
        deviceToken: {
            type: String,
            default: null,
        },
        accessToken: {
            type: String,
            default: null,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        userType: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

export const sessionModel: any = mongoose.model("session", sessionSchema);
