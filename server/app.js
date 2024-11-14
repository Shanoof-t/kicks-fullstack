import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRouter from "./routes/checkoutRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import defaultRouter from "./middleware/defaultRouter.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/cart", cartRoutes);
app.use("/checkout", checkoutRouter);
app.use("/orders", orderRouter);
app.all("*", defaultRouter);
app.use(globalErrorHandler);
export default app;
