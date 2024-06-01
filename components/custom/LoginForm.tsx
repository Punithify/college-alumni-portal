"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
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
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

type FormData = z.infer<typeof FormSchema>

export default function LoginForm() {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form", data)

    const { email, password } = data

    try {
      const response: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      })
      console.log({ response })
      if (response.ok) {
        console.log("Login Successful", response)
        toast({ title: "Login Successful" })
        // router.push("/dashboard")
      } else {
        throw new Error("Network response was not ok")
      }
      // Process response here
    } catch (error: any) {
      console.error("Login Failed:", error)
      toast({
        title: "Login Failed",
        variant: "destructive",
        description: error.message,
      })
    }
  }

  return (
    <div className="w-full space-y-6">
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          // className="p-4 md:p-16 flex flex-col items-center justify-center gap-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} type="text" />
                </FormControl>
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
                  <Input
                    placeholder="enter password"
                    {...field}
                    type="password"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-4 w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Loading...." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
