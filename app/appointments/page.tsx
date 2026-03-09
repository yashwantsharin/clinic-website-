import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AppointmentForm } from "@/components/appointments/appointment-form"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Phone, Mail, CalendarDays, CheckCircle } from "lucide-react"

export const metadata = {
  title: "Book an Appointment | Swastik Hospital",
  description: "Schedule your appointment at Swastik Hospital. Easy online booking for quality medical care.",
}

const benefits = [
  "Flexible scheduling to fit your needs",
  "Short wait times",
  "Comprehensive medical services",
  "Insurance accepted",
  "Same-day appointments available",
]

export default function AppointmentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Appointments
            </span>
            <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Schedule Your Visit
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              Book your appointment online and take the first step towards better health. 
              Our team is ready to provide you with excellent care.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="bg-background py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Booking Form */}
              <div className="lg:col-span-2">
                <AppointmentForm />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Opening Hours */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <Clock className="size-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">Opening Hours</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-medium text-foreground">9:00 AM - 6:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Saturday</span>
                        <span className="font-medium text-foreground">9:00 AM - 1:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-medium text-foreground">Closed</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <Phone className="size-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">Contact Us</h3>
                    </div>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="size-4 text-primary" />
                        <span>+91 9973622731</span>
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="size-4 text-primary" />
                        <span>contact@swastikhospital.com</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                        <a
                          href="https://share.google/nKY1rZosZW4khSRoF"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline-offset-4 hover:underline"
                        >
                          View on Google Maps
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Why Book With Us */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <CalendarDays className="size-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">Why Book With Us</h3>
                    </div>
                    <ul className="space-y-3">
                      {benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
