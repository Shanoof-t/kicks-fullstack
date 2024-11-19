import app from "./app/index.js";
import connectDB from "./config/db.js";
import { unhandledRejectionHandler } from "./src/utils/eventHandlers.js";

connectDB(); //database connection

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT);

unhandledRejectionHandler(server); //handler for unhandled Rejections
