"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth"
import { collection, onSnapshot, QueryDocumentSnapshot } from "firebase/firestore"
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
  const [user, loading] = useAuthState(auth)
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(collection(db, "appointments"), (snapshot) => {
        const appts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Appointment[]
        setAppointments(appts)
        setDataLoaded(true)
      })

      return () => unsubscribe()
    }
  }, [user])

  const handleUpdate = () => {
    // Re-fetch or update data if needed, onSnapshot handles this mostly
  }

  if (loading || !dataLoaded) {
    return <div className="flex h-screen items-center justify-center"><Spinner size="large" /></div>
  }

  if (!user) {
    return null
  }

  return <AdminDashboard appointments={appointments} onUpdate={handleUpdate} />
}
