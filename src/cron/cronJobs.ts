import mongoose from 'mongoose';
import { _httpStatusService } from "../utils/_httpStatus";
import { BlogService } from '../services/blog.service';
import cron from "node-cron";


export const deleteOldBlogs = async () => {
    try {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        await BlogService.deleteMany({ createdAt: { $lt: oneYearAgo } });
    } catch (error) {
        console.error("Error", error);
    }
};

export const scheduleCronJobs = () => {
    cron.schedule("0 0 * * *", async () => {
        console.log("Running cron job to delete old blogs...");
        await deleteOldBlogs();
    }, {
        scheduled: true,
        timezone: "UTC"
    });
    console.log("Cron job for deleting old blogs is scheduled.");
};