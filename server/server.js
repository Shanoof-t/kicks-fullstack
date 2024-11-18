import app from "./app.js";
import connectDB from "./config/db.js";
import "colors";
connectDB();

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT);

process.on("unhandledRejection", (error) => {
  console.error(
    `Error Name : ${error.name}  Error: ${error.message}`.red.underline.bold
  );
  console.log("Unhandled rejection occured! Shutting down...".yellow.bold);

  server.close(() => {
    process.exit(1);
  });
});
