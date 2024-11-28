import razorpay from "../config/razorpay.js";

export default {
  generateRazorpay: (order) => {
    return new Promise((resolve, reject) => {
      const { total_amount } = order;
      const options = {
        amount: total_amount,
        currency: "INR",
        receipt: `order_rcpt_${Date.now()}`,
      };

      razorpay.orders.create(options, (err, order) => {
        if (err) return reject(err);
        resolve(order);
      });
    });
  },
};
