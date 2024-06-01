import React from "react"
import { Terminal } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertMessage() {
  return (
    <Alert variant="destructive">
      <Terminal className="h-4 w-4" />
      <AlertTitle>No results found</AlertTitle>
      <AlertDescription>
        No results were fetched for this search
      </AlertDescription>
    </Alert>
  )
}
