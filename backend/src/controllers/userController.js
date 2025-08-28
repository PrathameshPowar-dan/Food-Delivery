import { asyncHandler } from "../utilities/AsyncHandler.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import User from "../models/user.model.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const requiredFields = { email, username, password };

    for (const [fieldName, fieldValue] of Object.entries(requiredFields)) {
        if (typeof fieldValue !== 'string' || !fieldValue.trim()) {
            throw new ApiError(400, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
        }
    }

    if (password.length < 5) {
        throw new ApiError(400, "Password must be atleast 6 letters")
    }

    const ExistingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (ExistingUser) {
        throw new ApiError(409, "User Already Exists")
    }

})