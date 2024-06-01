"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

type FormData = z.infer<typeof FormSchema>

export default function FormPage() {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form", data)

    const { username: email, password } = data

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      console.log(response)

      if (response.ok) {
        toast({
          title: "Registration Successful",
          description: "You have successfully registered.",
        })
        router.push("/dashboard")
        router.refresh()
      } else {
        throw new Error("Network response was not ok")
      }
    } catch (error: any) {
      console.error("Registration Failed:", error)
      toast({
        title: "Registration Failed",
        variant: "destructive",
        description: error.message,
      })
    }
  }

  return (
    <>
      <Toaster />

      <div className="w-full space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
        <span className="text-white mt-4">
          Already have an account ?
          <Link href="/login">
            <span className="text-green-500 ml-2">login</span>
          </Link>
        </span>
      </div>
    </>
  )
}
