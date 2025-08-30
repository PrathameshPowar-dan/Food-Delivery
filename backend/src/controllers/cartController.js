import { asyncHandler } from "../utilities/AsyncHandler.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import User from "../models/user.model.js";

export const AddCart = asyncHandler(async (req, res) => {
    const userData = await User.findById(req.user._id);
    const cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId] = {
            quantity: 1,
            ...req.body.itemData
        };
    }
    else {
        cartData[req.body.itemId].quantity += 1;
    }

    await User.findByIdAndUpdate(req.user._id, { cartData });

    return res.status(200).json(new ApiResponse(200, cartData, "Item added to cart successfully"));
})

export const RemoveCart = asyncHandler(async (req, res) => {
    const userData = await User.findById(req.user._id);
    const cartData = await userData.cartData;

    if (cartData[req.body.itemId]) {
        cartData[req.body.itemId].quantity -= 1;
    }

    await User.findByIdAndUpdate(req.user._id, { cartData });
    return res.status(200).json(new ApiResponse(200, cartData, "Item removed from cart successfully"));
})

export const GetCart = asyncHandler(async (req, res) => {
    const userData = await User.findById(req.user._id);
    const cartData = await userData.cartData;

    return res.status(200).json(new ApiResponse(200, cartData, "Cart fetched successfully"));
})

