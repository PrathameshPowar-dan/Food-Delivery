import { model, Mongoose, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrpyt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    }
}, { minimize: false })

const User = model("User", userSchema);
export default User;