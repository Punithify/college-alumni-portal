import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

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

export async function POST(request: Request) {
  try {
    const {
      username,
      email,
      dob,
      mobile,
      department,
      graduationYear,
      specialisation,
      extracurricularActivities,
      cocurricularActivities,
    } = await request.json()

    const response = await sql`
      INSERT INTO student (
        username,
        dob,
        mobile,
        email,
        department,
        graduation_year,
        specialisation,
        extracurricular_activities,
        cocurricular_activities
      ) VALUES (
        ${username},
        ${dob},
        ${mobile},
        ${email},
        ${department},
        ${graduationYear},
        ${specialisation},
        ${extracurricularActivities},
        ${cocurricularActivities}
      )
    `

    console.log(response)
  } catch (e) {
    console.log({ e })
  }

  return NextResponse.json({ message: "success" })
}
