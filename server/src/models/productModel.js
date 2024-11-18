import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: [true, "name is required"] },
  brand: { type: String, required: [true, "brand is required"] },
  gender: {
    type: String,
    required: [true, "gender is required"],
    enum: ["MEN", "WOMEN", "KIDS"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
    enum: ["RUNNING", "FOOTBALL", "CASUAL"],
  },
  price: { type: Number, required: [true, "price is required"] },
  items_left: {
    type: Number,
    required: [true, "product quantity is required"],
  },
  imageURL: { type: String, required: [true, "image url is required"] },
  description: { type: String, required: [true, "description is required"] },
  available_sizes: { type: Array, required: [true, "sizes is required"] },
});

export const Product = mongoose.model("Products", productSchema);
