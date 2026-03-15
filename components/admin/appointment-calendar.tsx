"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase/client"
import { collection, onSnapshot, query } from "firebase/firestore"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card } from "@/components/ui/card"

const localizer = momentLocalizer(moment)

interface Appointment {
  id: string
  name: string
  date: string
  time: string
}

interface CalendarEvent {
  title: string
  start: Date
  end: Date
  resource: Appointment
}

export function AppointmentCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([])

  useEffect(() => {
    const q = query(collection(db, "appointments"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Appointment[]

      const calendarEvents = appointments.map((app) => {
        const dateTimeString = `${app.date} ${app.time}`
        const start = moment(dateTimeString, "YYYY-MM-DD h:mm A").toDate()
        const end = moment(start).add(30, "minutes").toDate() // Assuming 30 minute slots
        return {
          title: app.name,
          start,
          end,
          resource: app,
        }
      })
      setEvents(calendarEvents)
    })

    return () => unsubscribe()
  }, [])

  return (
    <Card>
      <div className="h-[700px] p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
        />
      </div>
    </Card>
  )
}
