import { boolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

// Grades table
export const GRADES = mysqlTable("grades", {
  id: int("id").primaryKey(),
  grade: varchar("grade", { length: 100 }).notNull(),
});

// Students table
export const STUDENTS = mysqlTable("students", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 45 }).notNull(),
  grade: varchar("grade", { length: 50 }).notNull(),
  address: varchar("address", { length: 255 }),
  contact: varchar("contact", { length: 20 }),
});

// Attendance table
export const ATTENDANCE = mysqlTable("attendance", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("studentId").notNull(),
  present: boolean("present").default(false),
  day: int("day").notNull(),
  date: varchar("date", { length: 20 }).notNull(),
});
