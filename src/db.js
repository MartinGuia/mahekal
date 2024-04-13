import mongoose from "mongoose";
import 'dotenv/config'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log('>>> DB connected successfully');
    } catch (error) {
        console.log(error);
    }
};