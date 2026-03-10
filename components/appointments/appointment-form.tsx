
"use client"

import { useState } from "react"
import { db } from "@/lib/firebase/client"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle, AlertCircle } from "lucide-react"

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
]

const departments = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics"
]

export function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [department, setDepartment] = useState<string | undefined>()
  const [time, setTime] = useState<string | undefined>()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const date = formData.get("date") as string

    if (!name || !phone || !department || !date || !time) {
        setErrorMessage("Please fill in all fields.")
        setSubmitStatus("error")
        setIsSubmitting(false)
        return
    }

    try {
        await addDoc(collection(db, "appointments"), {
            name,
            phone,
            department,
            date,
            time,
            status: "pending",
            createdAt: serverTimestamp()
        })

        setSubmitStatus("success")
        e.currentTarget.reset()
        setDepartment(undefined)
        setTime(undefined)
    } catch (error) {
        setSubmitStatus("error")
        setErrorMessage("Failed to book appointment. Please try again.")
    } finally {
        setIsSubmitting(false)
    }
  }

  if (submitStatus === "success") {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="size-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-green-800">Appointment booked successfully</h3>
          <p className="mt-2 max-w-sm text-green-700">
            Thank you for booking with us. We will contact you shortly to confirm your appointment.
          </p>
          <Button 
            onClick={() => setSubmitStatus("idle")} 
            className="mt-6"
          >
            Book Another Appointment
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book an Appointment</CardTitle>
        <CardDescription>
          Fill out the form below and we will get back to you to confirm your appointment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
              />
            </Field>
            <Field>
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 9973622731"
                  required
                />
            </Field>
             <Field>
                <FieldLabel htmlFor="department">Department</FieldLabel>
                <Select name="department" required onValueChange={setDepartment}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="date">Preferred Date</FieldLabel>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="time">Preferred Time</FieldLabel>
                <Select name="time" required onValueChange={setTime}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="reason">Reason for Visit</FieldLabel>
              <Textarea
                id="reason"
                name="reason"
                placeholder="Please describe the reason for your visit..."
                rows={4}
              />
            </Field>

            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="size-4" />
                <span>{errorMessage || "Something went wrong. Please try again."}</span>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner className="size-4" />
                  Submitting...
                </>
              ) : (
                "Book Appointment"
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
