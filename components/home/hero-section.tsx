import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Phone } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Welcome to Swastik Hospital
              </span>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Your Health Is Our{" "}
                <span className="text-primary">Top Priority</span>
              </h1>
              <p className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
                Experience compassionate, personalized healthcare with our expert medical team. 
                We are dedicated to providing quality care for you and your family.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/appointments">
                  <Calendar className="size-5" />
                  Book Appointment
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <a href="tel:5551234567">
                  <Phone className="size-5" />
                  Call Us Now
                </a>
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">10K+</p>
                <p className="text-sm text-muted-foreground">Happy Patients</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">4.9</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="relative z-10 overflow-hidden rounded-2xl bg-card shadow-2xl">
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-accent/30 p-8">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 flex size-24 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-5xl font-bold text-primary">Dr</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Dr.Rahul Raj</h3>
                  <p className="text-muted-foreground">General Practitioner</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Board Certified | 3+ Years Experience
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -right-4 -top-4 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 size-72 rounded-full bg-accent/20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
