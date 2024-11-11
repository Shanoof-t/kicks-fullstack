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
  password: { type: String, required: [true, "Password is required"] },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: [true, "Role is required"],
  },
  cart: { type: Array },
});

export const User = mongoose.model("User", registerSchema);
