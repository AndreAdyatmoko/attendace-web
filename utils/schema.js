import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const GRADES = mysqlTable("grades", {
  id: int("id").primaryKey(),
  grade: varchar("grade", { length: 100 }).notNull(),
});

export const STUDENTS = mysqlTable("students", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 45 }).notNull(),
  grade: varchar("grade", {length:50}).notNull(),
  address: varchar("address", {length:255}),
  contact: varchar("contact", {length:20})
});
