'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, User } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase/client'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { Spinner } from '@/components/ui/spinner'

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
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const fetchAppointments = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'appointments'))
    const appts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Appointment[]
    setAppointments(appts)
  }, [])

  useEffect(() => {
    if (user) {
      fetchAppointments()
    }
  }, [user, fetchAppointments])

  const handleUpdate = () => {
    fetchAppointments()
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!user) {
    router.push('/admin/login')
    return null
  }

  return <AdminDashboard appointments={appointments} onUpdate={handleUpdate} />
}
