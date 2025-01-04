import db from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const grade = searchParams.get("grade");
  const month = searchParams.get("month");

  // Query with corrected method chaining
  const result = await db
    .select({
      name: STUDENTS.name,
      present: ATTENDANCE.present,
      day: ATTENDANCE.day,
      date: ATTENDANCE.date,
      grade: STUDENTS.grade,
      studentId: ATTENDANCE.studentId,
      attendanceId: ATTENDANCE.id,
    })
    .from(STUDENTS)
    .leftJoin(ATTENDANCE, eq(STUDENTS.id, ATTENDANCE.studentId))
    .where(eq(ATTENDANCE.date, month))
    .where(eq(STUDENTS.grade, grade))
  return NextResponse.json(result);
}
