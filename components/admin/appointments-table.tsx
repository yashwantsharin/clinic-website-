
import type { Appointment } from "@/app/admin/page"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

function AppointmentsTable({ 
  appointments, 
  onUpdateStatus, 
  onDelete 
}: { 
  appointments: Appointment[],
  onUpdateStatus: (id: string, status: "confirmed" | "completed") => void,
  onDelete: (id: string) => void
}) {
  const getStatusVariant = (status: Appointment["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "confirmed":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="font-medium">{appointment.name}</TableCell>
            <TableCell>{appointment.phone}</TableCell>
            <TableCell>{appointment.department}</TableCell>
            <TableCell>{appointment.date}</TableCell>
            <TableCell>{appointment.time}</TableCell>
            <TableCell>
              <Badge className={getStatusVariant(appointment.status)}>{appointment.status}</Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="w-4 h-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onUpdateStatus(appointment.id, "confirmed")}>Confirm</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUpdateStatus(appointment.id, "completed")}>Mark as Completed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(appointment.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AppointmentsTable
