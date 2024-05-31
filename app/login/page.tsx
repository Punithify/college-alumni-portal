import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import LoginForm from "@/components/custom/LoginForm"

export default async function LoginPage() {
  const session = await getServerSession()
  console.log({ session })

  if (session) {
    redirect("/dashboard")
  }

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="w-[450px]">
        <h1 className="text-4xl text-center font-extrabold tracking-tight lg:text-5xl">
          Login
        </h1>
        <LoginForm />
      </div>
    </section>
  )
}
