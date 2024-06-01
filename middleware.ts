import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  })
  const isLoggedIn = !!session?.sub

  if (!isLoggedIn) {
    const loginUrl = new URL("/login", req.url)
    return NextResponse.redirect(loginUrl)
  }

  if (req.nextUrl.pathname === "/dashboard") {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard"],
}
