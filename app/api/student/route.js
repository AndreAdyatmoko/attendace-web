import db from "@/utils";
import { STUDENTS } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const data = await req.json();

    try {
        const result = await db.insert(STUDENTS)
            .values({
                id: data?.id || null,
                name: data?.name,
                grade: data?.grade,
                address: data?.address,
                contact: data?.contact,
            });

        // Periksa jika insert berhasil dan kembalikan respons JSON yang benar
        return NextResponse.json({ message: "Student added successfully", data: result });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error adding student", error: error.message });
    }
}
