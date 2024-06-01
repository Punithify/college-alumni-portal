import React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type StudentData = {
  id: number
  username: string
  email: string
  department: string
  graduation_year: number
  specialisation: string
  extracurricular_activities: string
  cocurricular_activities: string
}

type StudentDetailModalProps = {
  student: StudentData | null
  isOpen: boolean
  onClose: () => void
}

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  isOpen,
  onClose,
}) => {
  if (!student) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{student.username}</DialogTitle>
          <DialogDescription>{student.email}</DialogDescription>
        </DialogHeader>
        <div>
          <p>Department: {student.department}</p>
          <p>Graduation Year: {student.graduation_year}</p>
          <p>specialisation: {student.specialisation}</p>
          <p>
            extracurricular_activities Year:{" "}
            {student.extracurricular_activities}
          </p>
          <p>cocurricular_activities : {student.cocurricular_activities}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default StudentDetailModal
