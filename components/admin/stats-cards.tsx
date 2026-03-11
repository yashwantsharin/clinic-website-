
import type { Appointment } from "@/app/admin/page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Clock } from "lucide-react"

export function StatsCards({ 
  appointments,
  setFilter
}: { 
  appointments: Appointment[], 
  setFilter: (filter: "all" | "today" | "pending") => void 
}) {
  const today = new Date().toISOString().split("T")[0]
  const todaysAppointments = appointments.filter((appt) => appt.date === today).length
  const pendingAppointments = appointments.filter((appt) => appt.status === "pending").length

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="cursor-pointer" onClick={() => setFilter("all")}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
          <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{appointments.length}</div>
        </CardContent>
      </Card>
      <Card className="cursor-pointer" onClick={() => setFilter("today")}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
          <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{todaysAppointments}</div>
        </CardContent>
      </Card>
      <Card className="cursor-pointer" onClick={() => setFilter("pending")}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pending Appointments</CardTitle>
          <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingAppointments}</div>
        </CardContent>
      </Card>
    </div>
  )
}
