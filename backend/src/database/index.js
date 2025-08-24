import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const ConnectDB = async()=>{
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`MongoDB Connected HOSTED: ${connectionInstance.connection.host}`);
    } catch (error) {
       console.error("MongoDB connection failed:", error);
       process.exit(1);
    }
}

export default ConnectDB;