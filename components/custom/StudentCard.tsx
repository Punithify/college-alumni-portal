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

async function getData() {
  const res = await getStudentsData()
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function StudentCard() {
  const data = await getData()
  console.log(data)

  return (
    <div className="mt-4 w-full flex justify-center">
      <div className="flex flex-wrap justify-center space-x-4">
        {data.map((item) => (
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
  )
}
