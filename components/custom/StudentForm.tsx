"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"

type FormData = {
  username: string
  dob: Date
  mobile: string
  email: string
  department: string
  graduationYear: number
  specialisation: string
  extracurricularActivities: string
  cocurricularActivities: string
}
export type ExtendedFieldValues = FieldValues & FormData
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  mobile: z.string().min(10, {
    message: "Mobile number must be at least 10 digits.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  department: z.string(),
  graduationYear: z.number().positive({
    message: "Graduation year must be a positive number.",
  }),
  specialisation: z.string(),
  extracurricularActivities: z.string(),
  cocurricularActivities: z.string(),
})

export default function StudentForm() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit: SubmitHandler<ExtendedFieldValues> = async (data) => {
    console.log(data)

    try {
      const response = await fetch("/api/auth/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      console.log(response)

      if (response.ok) {
        toast({
          title: "student added successfully",
        })
      } else {
        throw new Error("Network response was not ok")
      }
    } catch (error: any) {
      console.error("Something went wrong", error)
      toast({
        title: "Something Went Wrong",
        variant: "destructive",
        description: error.message,
      })
    }
  }

  return (
    <>
      <Toaster />
      <div className="mt-4 h-min flex items-center justify-center mb-8">
        <div className="w-full max-w-lg">
          <h1 className="text-4xl text-center font-extrabold tracking-tight lg:text-5xl">
            Add Student
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your mobile number for contact.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your email for contact.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Computer Science" {...field} />
                    </FormControl>
                    <FormDescription>Your department or major.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="graduationYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graduation Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2024"
                        {...field}
                        onBlur={(e) => {
                          field.onChange(Number(e.target.value))
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Your expected graduation year.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialisation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialisation</FormLabel>
                    <FormControl>
                      <Input placeholder="Web Development" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your area of specialisation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="extracurricularActivities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Extracurricular Activities</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List your extracurricular activities..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      List any extracurricular activities you are involved in.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cocurricularActivities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Co-curricular Activities</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List your co-curricular activities..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      List any co-curricular activities you are involved in.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full mb-4" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
