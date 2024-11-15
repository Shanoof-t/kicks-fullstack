import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import defaultRouter from "./middleware/defaultRouter.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import authRoutes from "./routes/v1/authRoutes.js";
import productRoutes from "./routes/v1/productRoutes.js";
import cartRoutes from "./routes/v1/cartRoutes.js";
import checkoutRouter from "./routes/v1/checkoutRoutes.js";
import orderRouter from "./routes/v1/orderRoutes.js";
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

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/checkout", checkoutRouter);
app.use("/api/v1/orders", orderRouter);

app.all("*", defaultRouter);
app.use(globalErrorHandler);

export default app;
