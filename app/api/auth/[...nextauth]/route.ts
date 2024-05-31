import { sql } from "@vercel/postgres"
import { compare } from "bcrypt"
import { User } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

interface ExtendedUser extends User {
  role?: string
}

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
        role: {},
      },
      async authorize(credentials, req) {
        const user = credentials as {
          email: string
          password: string
        }
        const response = await sql`
          SELECT * FROM users WHERE email=${credentials?.email}
        `
        const res = response.rows[0]

        const passwordCorrect = await compare(
          credentials?.password || "",
          res.password
        )
        if (passwordCorrect) {
          return {
            id: res.id,
            email: res.email,
            role: res.role,
          }
        }

        console.log("credentials", credentials)
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const Exteduser: ExtendedUser = user
      if (Exteduser) token.role = Exteduser.role
      console.log("token : ", token)
      return token
    },
    // async session({ session, token }) {
    //   if (session?.user) {
    //     session.user.role = token.role
    //   }
    //   console.log("session:", session)
    //   return session
    // },
  },
})

export { handler as GET, handler as POST }
