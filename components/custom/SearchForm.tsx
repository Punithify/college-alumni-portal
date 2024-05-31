"use client"

import React, { ChangeEvent, FormEvent, useState } from "react"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle the search logic here
    console.log("Searching for:", searchQuery)
  }

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={cn("w-full pl-10")} // Adding space for the icon
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <Button type="submit" variant="outline" className="ml-2">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </Button>
    </form>
  )
}

export default SearchForm
