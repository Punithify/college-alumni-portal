"use client"

import { useEffect, useState } from "react"
import { redirect, useSearchParams } from "next/navigation"
import { getServerSession } from "next-auth"

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

type StudentData = {
  id: number
  username: string
  email: string
  department: string
  graduation_year: number
}

export default function DashboardPage() {
  const [resData, setResData] = useState([])

  useEffect(() => {
    async function getData() {
      const res = await fetch("/api/auth/student")
      const data = await res.json()
      console.log(data)
      setResData(data)
    }
    getData()
  }, [])

  const data: StudentData[] = resData
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("query") || ""

  const filteredData = data?.filter(
    (item) =>
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.graduation_year.toString().includes(searchQuery)
  )

  console.log(filteredData)

  return (
    <>
      <div className="flex justify-center items-center mt-4">
        <SearchForm />
      </div>
      <div className="mt-4 w-full flex justify-center">
        <div className="flex flex-wrap justify-center space-x-4">
          {filteredData.length == 0 && <AlertMessage />}
          {filteredData.length &&
            filteredData.map((item: StudentData) => (
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
