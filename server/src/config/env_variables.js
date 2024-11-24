import dotenv from "dotenv";
dotenv.config();

const requiredEnvVar = [
  "MONGO_URL",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  "CLOUD_NAME",
  "API_KEY",
  "API_SECRET",
];

requiredEnvVar.forEach((key) => {
  if (!process.env[key])
    throw new Error(`Enviorment variable ${key} is missing`);
});

const env = {
  mongoUrl: process.env.MONGO_URL,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
};

export default env;
