"use client"

import { useState } from "react"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatsCards } from "@/components/admin/stats-cards"
import { AppointmentsTable } from "@/components/admin/appointments-table"
import { Appointment } from "@/app/admin/page"

interface AdminDashboardProps {
  appointments: Appointment[]
  onUpdate: () => void
}

export function AdminDashboard({ appointments, onUpdate }: AdminDashboardProps) {
  const [filter, setFilter] = useState("all")
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/admin/login")
  }

  const filteredAppointments = appointments.filter(appt => 
    filter === "all" ? true : appt.status === filter
  )

  const stats = {
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter(a => a.status === 'pending').length,
    confirmedAppointments: appointments.filter(a => a.status === 'confirmed').length,
    cancelledAppointments: appointments.filter(a => a.status === 'cancelled').length,
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900">
       <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-gray-800">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <StatsCards {...stats} />

        <div className="mt-8">
          <AppointmentsTable appointments={filteredAppointments} onUpdate={onUpdate} />
        </div>
      </main>
    </div>
  )
}
