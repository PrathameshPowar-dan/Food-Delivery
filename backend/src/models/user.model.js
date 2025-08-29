import { model, Mongoose, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrpyt from "bcrypt"

const userSchema = new Schema({
    name: {
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

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrpyt.hash(this.password, 10)
    }
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrpyt.compare(password, this.password)
}

userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_SECRET_TOKEN,
        {
            expiresIn: "7d"
        }
    )
}

const User = model("User", userSchema);
export default User;