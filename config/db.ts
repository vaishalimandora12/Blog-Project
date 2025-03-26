import mongoose from 'mongoose';

export const connection = async () => {
    try {
        const connectionString = `mongodb://127.0.0.1:27017/Blog-Database`;
        await mongoose.connect(connectionString, {});
        console.log("Database connected successfully ✌️");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

export const conn = mongoose.connection;