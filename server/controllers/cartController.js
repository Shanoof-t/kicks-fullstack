import mongoose from "mongoose";
import { User } from "../models/userModel.js";

export const addToCart = async (req, res) => {
  const { sub, role } = req.user;
  const { item } = req.body;
  if (!item) return res.status(400).json({ message: "Item is required" });
  try {
    const result = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(sub) },
      { $push: { cart: item } }
    );
    if (!result.acknowledged)
      return res.status(404).json({ message: "user cart update has problem" });
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.json(error);  
  }
};
