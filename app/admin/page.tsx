
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase/client"
import { collection, onSnapshot, query, where, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import AdminDashboard from "@/components/admin/admin-dashboard"
import { Spinner } from "@/components/ui/spinner"

export type Appointment = {
  id: string
  name: string
  phone: string
  department: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed"
  createdAt: Timestamp
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        router.push("/admin-login")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "appointments"))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const appointmentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Appointment, "id">),
        }))
        setAppointments(appointmentsData)
      })

      return () => unsubscribe()
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if (!user) {
    return null // Or a redirect component
  }

  return <AdminDashboard appointments={appointments} />
}
