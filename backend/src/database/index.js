import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const ConnectDB = async()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
       console.log("MongoDB connected");
    } catch (error) {
       console.error("MongoDB connection failed:", error);
       process.exit(1);
    }
}

export default ConnectDB;