import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

async function getStudents() {
  try {
    const students = await sql`
      SELECT
       *
      FROM student
    `
    return students.rows
  } catch (e) {
    console.error("Error fetching students:", e)
    throw e
  }
}

export async function getStudentsData() {
  try {
    const students = await getStudents()
    return NextResponse.json(students)
  } catch (e) {
    console.error("Error in GET handler:", e)
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    )
  }
}
