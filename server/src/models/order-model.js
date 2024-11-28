import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: [true, "user id is required"] },
    products: { type: Array, required: [true, "products is required"] },
    shipping_address: {
      email: { type: String, required: [true, "email is required"] },
      first_name: { type: String, required: [true, "firstName is required"] },
      last_name: { type: String, required: [true, "lastName is required"] },
      location: { type: String, required: [true, "location is required"] },
      phone: { type: String, required: [true, "number is required"] },
    },
    payment_method: {
      type: String,
      required: [true, "payment method is required"],
    },
    status: {
      type: String,
      required: [true, "status is required"],
      enum: ["pending", "placed", "delivered"],
    },
    total_amount: {
      type: Number,
      required: [true, "total amount is required"],
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("orders", orderSchema);
