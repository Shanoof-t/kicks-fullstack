import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: String,
    products: Array,
    shippingAddress: {
      email: String,
      firstName: String,
      lastName: String,
      location: String,
      phone: Number,
    },
    paymentMethod: String,
    status: String,
    totalAmount: Number,
  },
  { timestamps: true }
);

export const Order = mongoose.model("orders", orderSchema);
