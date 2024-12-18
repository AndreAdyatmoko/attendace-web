import "dotenv/config";
import { drizzle } from "drizzle-orm/singlestore/driver";
import mysql from "mysql2/promise";

console.log("DB Config Debug: dfadfadf");
console.log("Host:", process.env.DB_HOST);
console.log("Port:", process.env.DB_PORT);
console.log("User:", process.env.DB_USERNAME);
console.log("Password:", process.env.DB_PASSWORD);
console.log("Database:", process.env.DB_DATABASE);


const connection = await mysql.createConnection({
  host: process.env.local.DB_HOST,
  port: process.env.local.DB_PORT,
  user: process.env.local.DB_USERNAME,
  password: process.env.local.DB_PASSWORD,
  database: process.env.local.DB_DATABASE,
});

const db = drizzle(connection);

export default db;
