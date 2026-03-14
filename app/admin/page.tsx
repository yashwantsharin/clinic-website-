"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, User } from "firebase/auth"
import { collection, onSnapshot } from "firebase/firestore"
import { auth, db } from "@/lib/firebase/client"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { Spinner } from "@/components/ui/spinner"

export interface Appointment {
  id: string
  name: string
  phone: string
  email: string
  date: string
  time: string
  reason: string
  status: "pending" | "confirmed" | "cancelled"
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
        router.push("/admin/login")
      }
    })

    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(collection(db, "appointments"), (snapshot) => {
        const appts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Appointment[]
        setAppointments(appts)
        setLoading(false)
      })

      return () => unsubscribe()
    }
  }, [user])

  const handleUpdate = () => {
    // onSnapshot handles updates automatically
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <AdminDashboard appointments={appointments} onUpdate={handleUpdate} />
}
