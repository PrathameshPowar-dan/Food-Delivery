import { asyncHandler } from "../utilities/AsyncHandler.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import Food from "../models/food.model.js";

export const addFood = asyncHandler(async (req, res) => {
    const { name, description, price, category } = req.body;

    if (!name) {
        throw new ApiError(400, "All Name are required");
    }

    if (!description) {
        throw new ApiError(400, "All Description are required");
    }

    if (!price) {
        throw new ApiError(400, "All Price are required");
    }

    if (!category) {
        throw new ApiError(400, "All Category are required");
    }

    // if (!image) {
    //     throw new ApiError(400, "All Image are required");
    // }

    const image_path = req.file?.path;
    console.log("req.file:", req.file);
    console.log("Image path:", image_path);

    const foodItem = await Food.create({
        name,
        description,
        price,
        category,
        image: image_path
    });

    res.status(201).json(new ApiResponse(201, foodItem,"Food item created successfully"));
})