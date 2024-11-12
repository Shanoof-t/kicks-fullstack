import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import { SERVER_ERROR } from "../config/errorCodes.js";

export const checkoutDetails = async (req, res) => {
  const { sub } = req.user;
  try {
    const cartDetails = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(sub) } },
      { $unwind: "$cart" },
      {$addFields:{totalPrice:{$multiply:["$cart.price","$cart.quantity"]}}},
      {
        $group: {
          _id: "$_id",
          cartProductCount: { $sum: 1 },
          totalAmount: { $sum: "$totalPrice" },
          cart: {$push:"$cart"}
        },
      },
    ]);
    if (!cartDetails)
      return res.status(401).json({errCode:SERVER_ERROR, message: "can't find details" });
    return res.status(200).json(cartDetails[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errCode: SERVER_ERROR,
      message: "Something went wrong, please try again later",
    });
  }
};
