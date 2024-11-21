import cors from "cors";
import cookieParser from "cookie-parser";
import defaultRouter from "../src/middleware/defaultRouter.js";
import globalErrorHandler from "../src/utils/errorController.js";
import routes from "./routes.js";

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

  routes({ app });

  app.all("*", defaultRouter);
  app.use(globalErrorHandler);
};
