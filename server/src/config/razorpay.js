import Razorpay from "razorpay";
import env from "./env_variables.js";
const { razorpay_key_id, razorpay_key_secret } = env;
export default new Razorpay({
  key_id: razorpay_key_id,
  key_secret: razorpay_key_secret,
});
