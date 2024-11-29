import {
  authRouter,
  cartRouter,
  orderRouter,
  productRouter,
  statsRouter,
  userRoutes,
} from "../routes/v1/index.js";

export default ({ app }) => {
  // user routes

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/orders", orderRouter);
  app.use("/api/v1/user", userRoutes);

  // admin routes

  app.use("/api/v1/admin/auth", authRouter);
  app.use("/api/v1/admin/users", userRoutes);
  app.use("/api/v1/admin/products", productRouter);
  app.use("/api/v1/admin/orders", orderRouter);
  app.use("/api/v1/admin/stats", statsRouter);
};
