"use client"

import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Appointment } from "@/app/admin/page"

interface AppointmentsTableProps {
  appointments: Appointment[]
  onUpdate: () => void
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  confirmed: "bg-green-500",
  cancelled: "bg-red-500",
}

export function AppointmentsTable({ appointments, onUpdate }: AppointmentsTableProps) {
  const updateStatus = async (id: string, status: "confirmed" | "cancelled") => {
    const appointmentRef = doc(db, "appointments", id)
    await updateDoc(appointmentRef, { status })
    onUpdate()
  }

  const deleteAppointment = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      const appointmentRef = doc(db, "appointments", id)
      await deleteDoc(appointmentRef)
      onUpdate()
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Preferred Date</TableHead>
          <TableHead>Preferred Time</TableHead>
          <TableHead>Reason for Visit</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appt) => (
          <TableRow key={appt.id}>
            <TableCell>{appt.name}</TableCell>
            <TableCell>{appt.phone}</TableCell>
            <TableCell>{appt.email}</TableCell>
            <TableCell>{appt.date}</TableCell>
            <TableCell>{appt.time}</TableCell>
            <TableCell>{appt.reason}</TableCell>
            <TableCell>
              <Badge className={statusColors[appt.status]}>{appt.status}</Badge>
            </TableCell>
            <TableCell className="space-x-2">
              {appt.status === "pending" && (
                <Button size="sm" onClick={() => updateStatus(appt.id, "confirmed")}>
                  Confirm
                </Button>
              )}
               {appt.status !== "cancelled" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateStatus(appt.id, "cancelled")}
                >
                  Cancel
                </Button>
              )}
              <Button
                size="sm"
                variant="destructive"
                onClick={() => deleteAppointment(appt.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
