import * as React from "react"
import Link from "next/link"
import { getServerSession } from "next-auth"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import SignOutButton from "./custom/SignoutButton"

export async function MainNav() {
  const session = await getServerSession()

  return (
    <div className="flex justify-between items-center gap-6 md:gap-10 w-full">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="inline-block font-bold">AlumniNetwork</span>
      </Link>
      <nav className="flex items-center gap-6 flex-1">
        {session ? (
          <>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/student"
              className="text-sm font-medium text-muted-foreground"
            >
              Add Student
            </Link>
          </>
        ) : (
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground"
          >
            Login
          </Link>
        )}
      </nav>
      {session && <SignOutButton />}
    </div>
  )
}
