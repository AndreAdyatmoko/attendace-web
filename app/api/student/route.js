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

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing 'id' parameter" },
        { status: 400 }
      );
    }

    const result = await db.delete(STUDENTS).where(eq(STUDENTS.id, id));

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "No record found with the given ID" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Record deleted successfully", id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting record:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the record" },
      { status: 500 }
    );
  }
}
