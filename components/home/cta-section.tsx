import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Phone, MapPin } from "lucide-react"

export function CtaSection() {
  return (
    <section className="bg-primary py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-primary-foreground">
            <h2 className="text-balance text-3xl font-bold md:text-4xl">
              Ready to Schedule Your Visit?
            </h2>
            <p className="max-w-lg text-pretty text-primary-foreground/90">
              Book your appointment today and experience the difference of personalized, 
              compassionate healthcare. We are here to help you on your journey to better health.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="gap-2">
                <Link href="#appointments">
                  <Calendar className="size-5" />
                  Book Appointment
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <a href="tel:+919973622731">
                  <Phone className="size-5" />
                  +91 9973622731
                </a>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl bg-primary-foreground/10 p-6 backdrop-blur">
              <h3 className="mb-4 text-lg font-semibold text-primary-foreground">
                Clinic Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-primary-foreground/80" />
                  <div>
                    <p className="font-medium text-primary-foreground">Location</p>
                    <a
                      href="https://share.google/nKY1rZosZW4khSRoF"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-foreground/80 underline-offset-4 hover:underline"
                    >
                     View on Google Maps
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="mt-0.5 size-5 shrink-0 text-primary-foreground/80" />
                  <div>
                    <p className="font-medium text-primary-foreground">Opening Hours</p>
                    <p className="text-sm text-primary-foreground/80">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-sm text-primary-foreground/80">
                      Saturday: 9:00 AM - 1:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="mt-0.5 size-5 shrink-0 text-primary-foreground/80" />
                  <div>
                    <p className="font-medium text-primary-foreground">Contact</p>
                    <p className="text-sm text-primary-foreground/80">+91 9973622731</p>
                    <p className="text-sm text-primary-foreground/80">contact@healthcareclinic.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
