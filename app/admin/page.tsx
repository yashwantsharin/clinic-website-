'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { collection, onSnapshot, query, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentCalendar } from '@/components/admin/appointment-calendar'

export interface Appointment {
  id: string
  name: string
  phone: string
  email: string
  date: string
  time: string
  reason: string
  status: 'pending' | 'confirmed' | 'cancelled'
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filter, setFilter] = useState("all")
  const router = useRouter()

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
        router.push('/admin/login')
      }
      setLoading(false)
    });

    return () => authUnsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) {
        setAppointments([]);
        return;
    }

    const q = query(collection(db, "appointments"));
    const appointmentsUnsubscribe = onSnapshot(q, (querySnapshot) => {
        const appointmentsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Appointment));

        const timeToMinutes = (timeStr: string) => {
            const [time, modifier] = timeStr.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            if (modifier === 'PM' && hours < 12) {
                hours += 12;
            }
            if (modifier === 'AM' && hours === 12) {
                hours = 0;
            }
            return hours * 60 + minutes;
        };

        const sortedAppointments = appointmentsList.sort((a, b) => {
            const dateComparison = a.date.localeCompare(b.date);
            if (dateComparison !== 0) {
                return dateComparison;
            }
            return timeToMinutes(a.time) - timeToMinutes(b.time);
        });

        setAppointments(sortedAppointments);
    }, (error) => {
        console.error("Error fetching appointments:", error);
    });

    return () => appointmentsUnsubscribe();
  }, [user]);

  const handleUpdateStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      const appointmentRef = doc(db, 'appointments', id)
      await updateDoc(appointmentRef, { status })
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      if(window.confirm("Are you sure you want to delete this appointment?")) {
        const appointmentRef = doc(db, 'appointments', id)
        await deleteDoc(appointmentRef)
      }
    } catch (error) {
        console.error("Error deleting document:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/admin/login')
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if (!user) {
    return null
  }
  
  const filteredAppointments = appointments.filter(appt => 
    filter === "all" ? true : appt.status === filter
  )

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/40">
      <header className="flex items-center justify-between h-14 px-4 border-b lg:h-[60px] bg-background">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="outline">Logout</Button>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.pending}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.confirmed}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.cancelled}</div>
                </CardContent>
            </Card>
        </div>
        
        <Tabs defaultValue="list">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Appointments</CardTitle>
                  <div className="w-[180px]">
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden md:table-cell">Phone</TableHead>
                            <TableHead className="hidden md:table-cell">Email</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAppointments.length > 0 ? (
                            filteredAppointments.map((appt) => (
                                <TableRow key={appt.id}>
                                    <TableCell className="font-medium">{appt.name}</TableCell>
                                    <TableCell className="hidden md:table-cell">{appt.phone}</TableCell>
                                    <TableCell className="hidden md:table-cell">{appt.email}</TableCell>
                                    <TableCell>{appt.date}</TableCell>
                                    <TableCell>{appt.time}</TableCell>
                                    <TableCell>{appt.status}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button onClick={() => handleUpdateStatus(appt.id, 'confirmed')} size="sm" disabled={appt.status === 'confirmed'}>Confirm</Button>
                                        <Button onClick={() => handleUpdateStatus(appt.id, 'cancelled')} size="sm" variant="outline" disabled={appt.status === 'cancelled'}>Cancel</Button>
                                        <Button onClick={() => handleDelete(appt.id)} size="sm" variant="destructive">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center">No appointments found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="calendar">
            <AppointmentCalendar />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
