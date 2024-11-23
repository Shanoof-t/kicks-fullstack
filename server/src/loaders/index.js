import databaseLoader from "./db.js";
import expressLoader from "./express.js";

export default async ({ app, express }) => {
  const db = await databaseLoader(); //database connection
  console.log(`Connected to the database : ${db.databaseName}`.green.bold);
  expressLoader({ app, express });
};
