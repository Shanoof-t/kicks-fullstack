import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  first_name: { type: String, required: [true, "First name is required"] },
  last_name: { type: String, required: [true, "Last name is required"] },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "Gender is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: [true, "Role is required"],
  },
  cart: {
    type: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, "_id is required"],
        },
        name: { type: String, required: [true, "name is required"] },
        brand: { type: String, required: [true, "brand is required"] },
        gender: {
          type: String,
          enum: ["MEN", "WOMEN", "KIDS"],
          required: [true, "gender is required"],
        },
        category: {
          type: String,
          enum: ["RUNNING", "FOOTBALL", "CASUAL"],
          required: [true, "category is required"],
        },
        price: {
          type: Number,
          required: [true, "price is required"],
          min: [0, "price cannot be negative"],
        },
        items_left: {
          type: Number,
          required: [true, "auntity is required"],
          min: [0, "Items left cannot be negative"],
        },
        image_url: {
          type: String,
          required: [true, "image url is required"],
        },
        description: {
          type: String,
          required: [true, "Description is required"],
        },
        available_sizes: {
          type: Array,
        },
        size: {
          type: String,
          required: [true, "Size is required"],
        },
        quantity: {
          type: Number,
          required: [true, "quantity is required"],
          default: 1,
        },
      },
    ],
    // default: [],
  },
  Permissions: {
    type: [String],
    enum: ["create", "read", "update", "delete"],
    default: ["read", "update"],
  },
});

export const User = mongoose.model("User", registerSchema);
