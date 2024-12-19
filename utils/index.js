import "dotenv/config";
import { drizzle } from "drizzle-orm/singlestore/driver";
import mysql from "mysql2/promise";


const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE, // Tambahkan ini untuk memilih database
});

const db = drizzle(connection);

export default db;
