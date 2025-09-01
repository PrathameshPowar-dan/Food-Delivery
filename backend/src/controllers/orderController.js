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
            user: req.user._id,
            items: req.body.items,
            address: req.body.address,
            totalAmount: req.body.totalAmount,
            paymentStatus: "pending"
        })
        await newOrder.save();
        await User.findByIdAndUpdate(req.user._id, { cartData: {} });

        const line_items = req.body.items.map(item => ({
            price_data: {
                currency: "inr",
                product_name: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 88
            },
            quantity: item.quantity
        }))


        line_items.push({
            price_data: {
                currency: "inr",
                product_name: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 88
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: 'http://localhost:5173/verify?success=true&orderId=' + newOrder._id,
            cancel_url: 'http://localhost:5173/verify?success=false&orderId=' + newOrder._id,
        })

        res.status(201).json(ApiResponse(true, "Order placed successfully", { success: true, session_url: session.url }))
    } catch (error) {
        console.log(error);
        throw new ApiError("Failed to place order", 500);
    }

})

