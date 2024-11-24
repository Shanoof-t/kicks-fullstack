import { v2 as cloudinary } from "cloudinary";
import env from "./env_variables.js";

const { cloud_name, api_key, api_secret } = env;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

export default cloudinary;
