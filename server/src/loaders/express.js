import cors from "cors";
import cookieParser from "cookie-parser";
import defaultRouter from "../middleware/default-router.js"
import globalErrorHandler from "../utils/global-error-handler.js"
import routes from "./routes.js"
import morgan from "../config/morgan.js";

export default ({ app, express }) => {
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan());

  routes({ app });

  app.all("*", defaultRouter);
  app.use(globalErrorHandler);
};
