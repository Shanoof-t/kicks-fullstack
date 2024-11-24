import { Order } from "../models/order-model.js";

export const createStats = async () => {
  const stats = Order.aggregate([
    { $addFields: { totalRevenue: { $sum: "$totalAmount" } } },
    { $unwind: "$products" },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalRevenue" },
        totalProductPurchased: { $sum: "$products.quantity" },
      },
    },
    { $project: { _id: 0 } },
  ]);
  return stats;
};
