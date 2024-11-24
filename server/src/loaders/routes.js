import authRoutes from "../routes/v1/auth-routes.js";
import productRoutes from "../routes/v1/productRoutes.js";
import cartRoutes from "../routes/v1/cartRoutes.js";
import checkoutRouter from "../routes/v1/cartRoutes.js";
import orderRouter from "../routes/v1/orderRoutes.js";
import userRoutes from "../routes/v1/userRoutes.js";
import statsRouter from "../routes/v1/statsRouter.js";

export default ({ app }) => {
  
  // user routes
  
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/products", productRoutes);
  app.use("/api/v1/cart", cartRoutes);
  app.use("/api/v1/checkout", checkoutRouter);
  app.use("/api/v1/orders", orderRouter);

  // admin routes

  app.use("/api/v1/admin/auth", authRoutes);
  app.use("/api/v1/admin/users", userRoutes);
  app.use("/api/v1/admin/products", productRoutes);
  app.use("/api/v1/admin/orders", orderRouter);
  app.use("/api/v1/admin/stats", statsRouter);
};


