import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Stripe from "stripe";
import { asyncHandler } from "../utilities/AsyncHandler.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = asyncHandler(async (req, res) => {
    try {

        const newOrder = new Order({
            userId: req.user._id.toString(),
            items: req.body.items,
            address: req.body.address,
            amount: req.body.amount,
            payment: false
        });

        await newOrder.save();


        await User.findByIdAndUpdate(req.user._id, { cartData: {} });

        const line_items = req.body.items.map(item => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100 * 88
            },
            quantity: item.quantity
        }));


        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 88
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: 'http://localhost:5173/verify?success=true&orderId=' + newOrder._id,
            cancel_url: 'http://localhost:5173/verify?success=false&orderId=' + newOrder._id,
        });

        return res.status(200).json(
            new ApiResponse(200, {
                success: true,
                session_url: session.url
            }, "Order placed successfully")
        );

    } catch (error) {
        console.log("Order placement error:", error);
        throw new ApiError("Failed to place order", 500);
    }
});

export const verifyOrder = asyncHandler(async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await Order.findByIdAndUpdate(orderId, { payment: true });
            return res.status(200).json(
                new ApiResponse(200, { success: true }, "Order verified successfully")
            );
        } else {
            await Order.findByIdAndDelete(orderId);
            return res.status(400).json(new ApiResponse(400, { success: false }, "Order verification failed"));
        }
    } catch (error) {
        console.log("Order verification error:", error);
        throw new ApiError(500, "Failed to verify order");
    }
})

export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ userId: req.user._id });
    return res.status(200).json(
        new ApiResponse(200, orders, "Orders fetched successfully")
    );
})