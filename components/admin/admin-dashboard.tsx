
"use client"

import { useState } from "react"
import type { Appointment } from "@/app/admin/page"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db, auth } from "@/lib/firebase/client"
import { Button } from "@/components/ui/button"
import { StatsCards } from "@/components/admin/stats-cards"
import AppointmentsTable from "./appointments-table"

export default function AdminDashboard({ appointments }: { appointments: Appointment[] }) {
  const [filter, setFilter] = useState<"all" | "today" | "pending">("all")

  const handleUpdateStatus = async (id: string, status: "confirmed" | "completed") => {
    const appointmentRef = doc(db, "appointments", id)
    await updateDoc(appointmentRef, { status })
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      const appointmentRef = doc(db, "appointments", id)
      await deleteDoc(appointmentRef)
    }
  }

  const getFilteredAppointments = () => {
    const today = new Date().toISOString().split("T")[0]
    switch (filter) {
      case "today":
        return appointments.filter((appt) => appt.date === today)
      case "pending":
        return appointments.filter((appt) => appt.status === "pending")
      case "all":
      default:
        return appointments
    }
  }

  const filteredAppointments = getFilteredAppointments()

  return (
    <div className="min-h-screen bg-gray-100/50 dark:bg-gray-900/50">
      <header className="flex items-center justify-between h-16 px-4 bg-white border-b shrink-0 dark:bg-gray-950">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <Button onClick={() => auth.signOut()} variant="outline">
          Logout
        </Button>
      </header>
      <main className="p-4 sm:p-6">
        <StatsCards appointments={appointments} setFilter={setFilter} />
        <div className="mt-6">
          <AppointmentsTable
            appointments={filteredAppointments}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  )
}
