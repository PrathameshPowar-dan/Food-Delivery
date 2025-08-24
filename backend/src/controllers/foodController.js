import { asyncHandler } from "../utilities/AsyncHandler";
import { ApiError } from "../utilities/ApiError";
import { ApiResponse } from "../utilities/ApiResponse";

export const addFood = asyncHandler(async (req, res) => {
    const { name, price, category, image } = req.body;

    if (!name || !price || !category || !image) {
        throw new ApiError(400, "All fields are required");
    }

    const foodItem = await Food.create({
        name,
        price,
        category,
        image
    });

    res.status(201).json(new ApiResponse(201, foodItem));
})