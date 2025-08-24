import { asyncHandler } from "../utilities/AsyncHandler.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import Food from "../models/food.model.js";
import { UploadCloudinary, DeleteCloudinary } from "../utilities/cloudinary.js";

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

    const cloudinaryResponse = await UploadCloudinary(image_path, name, category);
    if (!cloudinaryResponse) {
        throw new ApiError(500, "Image upload failed");
    }

    const foodItem = await Food.create({
        name,
        description,
        price,
        category,
        image: cloudinaryResponse.url
    });

    res.status(201).json(new ApiResponse(201, foodItem, "Food item created successfully"));
})

export const listFood = asyncHandler(async (req, res) => {
    const fooditem = await Food.find();
    res.status(200).json(new ApiResponse(200, fooditem, "Food items retrieved successfully"));
})

export const removeFood = asyncHandler(async (req, res) => {
    const { id } = req.body;

    const food = await Food.findById(id);

    if (!food) {
        throw new ApiError(404, "Food item not found");
    }

    // Delete image from Cloudinary using the stored public_id
    if (food.public_id) {
        await DeleteCloudinary(food.public_id);
    }

    await Food.findByIdAndDelete(id);

    res.status(200).json(new ApiResponse(200, null, "Food item removed successfully"));
});























