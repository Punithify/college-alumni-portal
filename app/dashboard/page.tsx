"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AlertMessage from "@/components/custom/AlertMessage"
import SearchForm from "@/components/custom/SearchForm"
import StudentDetailModal from "@/components/custom/StudentDetailModal"

type StudentData = {
  id: number
  username: string
  email: string
  department: string
  graduation_year: number
  specialisation: string
  extracurricular_activities: string
  cocurricular_activities: string
}

export default function DashboardPage() {
  const [resData, setResData] = useState<StudentData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function getData() {
      const res = await fetch("/api/auth/student")
      const data = await res.json()
      console.log(data)
      setResData(data)
      setIsLoading(false)
    }
    getData()
  }, [])

  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("query") || ""
  if (!resData) {
    return <AlertMessage />
  }
  const filteredData = resData.filter(
    (item) =>
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.graduation_year.toString().includes(searchQuery)
  )

  const handleCardClick = (student: StudentData) => {
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

  console.log(filteredData)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (resData.length === 0) {
    return <div>No data available</div>
  }

  return (
    <>
      <div className="flex justify-center items-center mt-4">
        <SearchForm />
      </div>
      <div className="mt-4 w-full flex justify-center">
        <div className="flex flex-wrap justify-center space-x-4">
          {resData.length > 0 && filteredData.length === 0 ? (
            <AlertMessage />
          ) : (
            <>
              {filteredData.map((item: StudentData) => (
                <div
                  key={item.id}
                  className="w-64"
                  onClick={() => handleCardClick(item)}
                >
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle>{item.username}</CardTitle>
                      <CardDescription>{item.email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{item.department}</p>
                    </CardContent>
                    <CardFooter>
                      <p className="text-red">{item.graduation_year}</p>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <StudentDetailModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
