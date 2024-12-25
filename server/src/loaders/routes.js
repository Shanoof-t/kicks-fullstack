import {
  authRouter,
  cartRouter,
  orderRouter,
  productRouter,
  statsRouter,
  userRoutes,
} from "../routes/v1/index.js";
import pagination from "../middleware/pagination.js";
export default ({ app }) => {
  // user routes

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/orders", orderRouter);
  app.use("/api/v1/user", userRoutes);

  const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    { id: 4, name: "User 4" },
    { id: 5, name: "User 5" },
    { id: 6, name: "User 6" },
    { id: 7, name: "User 7" },
    { id: 8, name: "User 8" },
    { id: 9, name: "User 9" },
    { id: 10, name: "User 10" },
    { id: 11, name: "User 11" },
    { id: 12, name: "User 12" },
    { id: 13, name: "User 13" },
    { id: 14, name: "User 14" },
    { id: 15, name: "User 15" },
  ];

  app.use("/api/v1/sample", pagination(users), (req, res) => {
    const { paginatedResults } = req;
    res.json(paginatedResults);
  });

  // admin routes

  app.use("/api/v1/admin/auth", authRouter);
  app.use("/api/v1/admin/users", userRoutes);
  app.use("/api/v1/admin/products", productRouter);
  app.use("/api/v1/admin/orders", orderRouter);
  app.use("/api/v1/admin/stats", statsRouter);
};
