import "colors";
import connectDB from "../loaders/db.js"
import { Product } from "../models/product-model.js";
import mongoose from "mongoose";

connectDB();

const products = [
  {
    name: "Nike Air Zoom Pegasus 39",
    brand: "Nike",
    gender: "MEN",
    category: "RUNNING",
    price: 120,
    items_left: 50,
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    description: "Lightweight and breathable running shoes designed for maximum speed and comfort.",
    available_sizes: ["8", "9", "10", "11", "12"]
  },
  {
    name: "Adidas Predator Edge.3",
    brand: "Adidas",
    gender: "MEN",
    category: "FOOTBALL",
    price: 85,
    items_left: 30,
    image_url: "https://images.unsplash.com/photo-1610682136052-a54b38d01768?q=80&w=2070&auto=format&fit=crop",
    description: "Control the game with these precision football boots. Gives you an edge on the field.",
    available_sizes: ["7", "8", "9", "10", "11"]
  },
  {
    name: "Puma Suede Classic",
    brand: "Puma",
    gender: "WOMEN",
    category: "CASUAL",
    price: 70,
    items_left: 100,
    image_url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974&auto=format&fit=crop",
    description: "The timeless classic suede sneaker, perfect for everyday casual wear.",
    available_sizes: ["5", "6", "7", "8", "9"]
  },
  {
    name: "Nike Kids Revolution 6",
    brand: "Nike",
    gender: "KIDS",
    category: "RUNNING",
    price: 55,
    items_left: 45,
    image_url: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=2070&auto=format&fit=crop",
    description: "Comfortable and durable running shoes for active kids. Easy to wear.",
    available_sizes: ["1", "2", "3", "4"]
  },
  {
    name: "New Balance 574 Core",
    brand: "New Balance",
    gender: "MEN",
    category: "CASUAL",
    price: 80,
    items_left: 60,
    image_url: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2071&auto=format&fit=crop",
    description: "A versatile icon, the 574 blends clean lines and classic style for everyday appeal.",
    available_sizes: ["8", "8.5", "9", "9.5", "10", "11"]
  }
];

const createProducts = async () => {
  try {
    await Product.insertMany(products);
    console.log("Products are created!".green);
    mongoose.connection.close();
  } catch (error) {
    console.error(`Error: ${error.message}`.red);
    mongoose.connection.close();
    process.exit(1);
  }
};

async function removeProducts() {
  try {
    const res = await Product.deleteMany({});
    console.log(`${res.deletedCount} products removed!`.yellow);
    mongoose.connection.close();
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    mongoose.connection.close();
    process.exit(1);
  }
}

if (process.argv[2] === "-r") {
  removeProducts();
} else {
  createProducts();
}
