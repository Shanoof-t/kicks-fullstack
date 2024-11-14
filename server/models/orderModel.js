import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: [true, "user id is required"] },
    products: { type: Array, required: [true, "products is required"] },
    shippingAddress: {
      email: { type: String, required: [true, "email is required"] },
      firstName: { type: String, required: [true, "firstName is required"] },
      lastName: { type: String, required: [true, "lastName is required"] },
      location: { type: String, required: [true, "location is required"] },
      phone: { type: Number, required: [true, "number is required"] },
    },
    paymentMethod: { type: String, required: [true, "payment method is required"] },
    status: { type: String, required: [true, "status is required"] },
    totalAmount: { type: Number, required: [true, "total amount is required"] },
  },
  { timestamps: true }
);

export const Order = mongoose.model("orders", orderSchema);
