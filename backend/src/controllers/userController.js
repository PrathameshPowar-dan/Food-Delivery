import { asyncHandler } from "../utilities/AsyncHandler.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import User from "../models/user.model.js";

const isProduction = process.env.NODE_ENV === 'production';

const options = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "strict",
  secure: isProduction,
}

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const requiredFields = { email, name, password };

    for (const [fieldName, fieldValue] of Object.entries(requiredFields)) {
        if (typeof fieldValue !== 'string' || !fieldValue.trim()) {
            throw new ApiError(400, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
        }
    }

    if (password.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters")
    }

    const ExistingUser = await User.findOne({
        $or: [{ name }, { email }]
    })

    if (ExistingUser) {
        throw new ApiError(409, "User Already Exists")
    }

    const user = await User.create({
        email,
        password,
        name
    });

    const Token = user.generateToken();

    const CreatedUser = await User.findById(user._id).select("-password")

    if (!CreatedUser) {
        throw new ApiError(500, "Something went wrong creating User")
    }

    return res
        .status(201) // changed to 201 Created
        .cookie("Token", Token, options)
        .json(
            new ApiResponse(201, CreatedUser, "User Registered Successfully")
        )
})

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const requiredFields = { email, password };
    for (const [fieldName, fieldValue] of Object.entries(requiredFields)) {
        if (typeof fieldValue !== 'string' || !fieldValue.trim()) {
            throw new ApiError(400, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
        }
    }

    const user = await User.findOne({email});
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const PasswordValidation = await user.isPasswordCorrect(password);

    if (!PasswordValidation) {
        throw new ApiError(401, "Invalid password");
    }

    const Token = user.generateToken();

    const LoggedInUser = await User.findById(user._id).select("-password");

    return res.status(200).cookie("Token",Token,options).json(new ApiResponse(200, LoggedInUser, "LOGGED IN SUCCESSFULLY"));
})

export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("Token", options);
    return res.status(200).json(new ApiResponse(200, null, "LOGGED OUT SUCCESSFULLY"));
})

export const Check =asyncHandler(async(req,res)=>{
    try {
        const data = req.data;
        res.status(200).json(new ApiResponse(200, data, "Token is valid"));
    } catch (error) {
        throw new ApiError(500,"Internal ERROR")
    }
})