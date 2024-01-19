import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/mahekal');
        console.log('>>> DB connected successfully');
    } catch (error) {
        console.log(error);
    }
};