import dotenv from "dotenv";  // Mengimpor dotenv jika ingin menggunakan config manual

dotenv.config({ path: ".env.local" });  // Memuat file .env.local


export default {
  schema: "./utils/schema.js",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};
