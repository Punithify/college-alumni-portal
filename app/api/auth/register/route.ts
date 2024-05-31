import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { hash } from "bcrypt"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const hashedPassword = await hash(password, 10)
    const response =
      await sql`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword})`
    console.log(response)
    console.log({ email, password })
  } catch (e) {
    console.log({ e })
  }

  return NextResponse.json({ message: "success" })
}
