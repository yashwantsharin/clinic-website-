'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        const snapshot = await getDocs(collection(db, "appointments"))
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Appointment[]
        setAppointments(data)
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleUpdate = async () => {
    if (user) {
        const snapshot = await getDocs(collection(db, "appointments"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Appointment[];
        setAppointments(data);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!user) {
    redirect('/admin/login');
    return null;
  }

  return <AdminDashboard appointments={appointments} onUpdate={handleUpdate} />
}
