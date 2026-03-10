
import type { Appointment } from "@/app/admin/page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
          <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{appointments.length}</div>
        </CardContent>
      </Card>
      <Card className="cursor-pointer" onClick={() => setFilter("today")}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
          <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{todaysAppointments}</div>
        </CardContent>
      </Card>
      <Card className="cursor-pointer" onClick={() => setFilter("pending")}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pending Appointments</CardTitle>
          <ClockIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingAppointments}</div>
        </CardContent>
      </Card>
    </div>
  )
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
