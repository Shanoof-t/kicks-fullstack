import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import https from "https";
import fs from "fs";
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/cart", cartRoutes);

// const server = https.createServer(
//   {
//     key: fs.readFileSync("localhost-key.pem"),
//     cert: fs.readFileSync("localhost.pem"),
//   },
//   app
// );

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
  console.log(PORT)
});
