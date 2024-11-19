import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import defaultRouter from "../src/middleware/defaultRouter.js";
import authRoutes from "../src/routes/v1/authRoutes.js";
import productRoutes from "../src/routes/v1/productRoutes.js";
import cartRoutes from "../src/routes/v1/cartRoutes.js";
import checkoutRouter from "../src/routes/v1/cartRoutes.js";
import orderRouter from "../src/routes/v1/orderRoutes.js";
import globalErrorHandler from "../src/utils/errorController.js";
import userRoutes from "../src/routes/v1/userRoutes.js";

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

// user routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/checkout", checkoutRouter);
app.use("/api/v1/orders", orderRouter);

// admin routes

app.use("/api/v1/admin/users", userRoutes);
app.use("/api/v1/admin/products", productRoutes);
app.use("/api/v1/admin/orders", orderRouter);

app.all("*", defaultRouter);
app.use(globalErrorHandler);

export default app;
