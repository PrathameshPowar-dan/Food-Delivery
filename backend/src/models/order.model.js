import { model, Mongoose, Schema } from "mongoose";

const orderSchema = Schema({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "Processing"
    },
    date: {
        type: Date,
        default: Date.now()
    },
    payment: {
        type: Boolean,
        default: false
    }
})

const Order = model("Order", orderSchema)

export default Order;