import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

// export default async function IndexPage() {
//   const session = await getServerSession()
//   if (session) {
//     redirect("/dashboard")
//   }

//   return (
//     <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
//       <h1>Home</h1>
//     </section>
//   )
// }

import { buttonVariants } from "@/components/ui/button"

export default async function IndexPage() {
  const session = await getServerSession()
  if (session) {
    redirect("/dashboard")
  }
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Welcome to Alumni Network Connect <br className="hidden sm:inline" />
          built with Next JS, Authenication using Next-auth and UI- shadcn.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Connect with with your old buddies
        </p>
      </div>
    </section>
  )
}
