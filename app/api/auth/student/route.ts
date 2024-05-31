import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

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
