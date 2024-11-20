import "colors";
import { unhandledRejectionHandler } from "./src/utils/eventHandlers.js";
import express from "express";
import loaders from "./loaders/index.js";

const app = express();

const startServer = async () => {
  await loaders({ app, express }); // loaders

  const PORT = process.env.PORT || 8080;
  const server = app.listen(PORT);

  unhandledRejectionHandler(server); //handler for unhandled Rejections
};
startServer();
