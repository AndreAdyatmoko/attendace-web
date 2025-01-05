import db from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { eq, isNull, and, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const grade = searchParams.get("grade");
  const month = searchParams.get("month");

  if (!grade || !month) {
    return NextResponse.json({ error: "Grade or month is missing" }, { status: 400 });
  }

  try {
    const result = await db
      .select({
        studentName: STUDENTS.name,
        isPresent: ATTENDANCE.present,
        attendanceDay: ATTENDANCE.day,
        attendanceDate: ATTENDANCE.date,
        studentGrade: STUDENTS.grade,
        studentId: ATTENDANCE.studentId,
        attendanceId: ATTENDANCE.id,
      })
      .from(STUDENTS)
      .leftJoin(ATTENDANCE, eq(STUDENTS.id, ATTENDANCE.studentId))
      .where(
        and(
          eq(STUDENTS.grade, grade),
          or(
            eq(ATTENDANCE.date, month),
            isNull(ATTENDANCE.date)
          )
        )
      );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Database query failed", details: error.message }, { status: 500 });
  }
}
