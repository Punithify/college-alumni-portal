import React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import StudentForm from "@/components/custom/StudentForm"

export default async function StudentPage() {
  const session = await getServerSession()
  console.log({ session })

  if (!session) {
    redirect("/login")
  }
  return <StudentForm />
}
