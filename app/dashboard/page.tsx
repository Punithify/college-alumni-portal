import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { getStudentsData } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SearchForm from "@/components/custom/SearchForm"

type StudentData = {
  id: number
  username: string
  email: string
  department: string
  graduation_year: number
}

async function getData(): Promise<StudentData[]> {
  const res = await getStudentsData()
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function DashboardPage() {
  const session = await getServerSession()
  if (!session) {
    redirect("/login")
  }

  const data: StudentData[] = await getData()
  console.log(data)

  return (
    <>
      <div className="flex justify-center items-center mt-4">
        <SearchForm />
      </div>

      <div className="mt-4 w-full flex justify-center">
        <div className="flex flex-wrap justify-center space-x-4">
          {!data && <p>Something went wrong</p>}
          {data &&
            data.map((item: StudentData) => (
              <div key={item.id} className="w-64">
                <Card>
                  <CardHeader>
                    <CardTitle>{item.username}</CardTitle>
                    <CardDescription>{item.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{item.department}</p>
                  </CardContent>
                  <CardFooter>
                    <p>{item.graduation_year}</p>
                  </CardFooter>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
