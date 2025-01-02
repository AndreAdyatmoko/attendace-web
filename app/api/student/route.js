import db from "@/utils";
import { STUDENTS } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse request data
    const data = await req.json();

    // Validate required fields
    if (!data?.name || !data?.grade || !data?.address || !data?.contact) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert data into the database
    const result = await db.insert(STUDENTS).values({
      id: data?.id || null, // Optional field
      name: data.name,
      grade: data.grade,
      address: data.address,
      contact: data.contact,
    });

    // Return success response
    return NextResponse.json(
      { message: "Student added successfully", data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error.message);
    return NextResponse.json(
      { message: "Error adding student", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch all students from the database
    const result = await db.select().from(STUDENTS);

    // Return success response
    return NextResponse.json(
      { message: "Students retrieved successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Error:", error.message);
    return NextResponse.json(
      { message: "Error retrieving students", error: error.message },
      { status: 500 }
    );
  }
}
