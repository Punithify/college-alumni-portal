import React from "react"
import { useRouter } from "next/navigation"
import { getServerSession } from "next-auth"

import SearchForm from "@/components/custom/SearchForm"
import StudentCard from "@/components/custom/StudentCard"

export default async function DashboardPage() {
  const session = await getServerSession()
  console.log(session?.user)

  return (
    <div>
      <div className="flex justify-center items-center m-4">
        <SearchForm />
      </div>
      <StudentCard />
    </div>
  )
}
