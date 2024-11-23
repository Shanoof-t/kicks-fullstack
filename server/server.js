import "colors";
import express from "express";
import loaders from "./src/loaders/index.js"
import { unhandledRejectionHandler } from "./src/utils/errorHandlers.js";

const app = express();

const startServer = async () => {
  
  await loaders({ app, express }); // loaders
  
  const PORT = process.env.PORT || 8080;
  const server = app.listen(PORT);

  unhandledRejectionHandler(server); //handler for unhandled Rejections
};
startServer();
