"use client"

import { signOut } from "next-auth/react"

export default function SignOutButton() {
  return (
    <a
      href="#"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="mr-4 flex items-center text-sm font-medium text-muted-foreground"
    >
      Sign Out
    </a>
  )
}
