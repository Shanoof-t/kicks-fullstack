import dotenv from "dotenv";
dotenv.config();

const requiredEnvVar = [
  "MONGO_URL",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
];
requiredEnvVar.forEach((key) => {
  if (!process.env[key])
    throw new Error`Enviorment variable ${key} is missing`();
});

const config = {  
  mongoUrl: process.env.MONGO_URL,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};

export default config;
