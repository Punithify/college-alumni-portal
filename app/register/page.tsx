import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import FormPage from "@/components/custom/FormPage"

export default async function RegisterPage() {
  const session = await getServerSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="w-[450px]">
        <h1 className="text-4xl text-center font-extrabold tracking-tight lg:text-5xl">
          SignUp
        </h1>
        <FormPage />
      </div>
    </section>
  )
}
