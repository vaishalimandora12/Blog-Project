import mongoose from 'mongoose';

export const connection = async () => {
    try {
        const connectionString = process.env.DB_URL;

        await mongoose.connect(connectionString, {});
        console.log("Database connected successfully ✌️");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

export const conn = mongoose.connection;