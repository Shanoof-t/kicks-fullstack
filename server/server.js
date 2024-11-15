import app from "./app.js";
import connectDB from "./app/config/db.js";

connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT);
