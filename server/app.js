import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import defaultRouter from "./app/middleware/defaultRouter.js";
import authRoutes from "./app/routes/v1/authRoutes.js";
import productRoutes from "./app/routes/v1/productRoutes.js";
import cartRoutes from "./app/routes/v1/cartRoutes.js";
import checkoutRouter from "./app/routes/v1/cartRoutes.js";
import orderRouter from "./app/routes/v1/orderRoutes.js";
import globalErrorHandler from "./app/controllers/errorController.js"



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
