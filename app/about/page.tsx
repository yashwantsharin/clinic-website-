import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { DoctorsCarousel } from "@/components/about/doctors-carousel";
import { GraduationCap, Award, Heart, Users, Stethoscope, Clock } from "lucide-react";

export const metadata = {
  title: "Our Doctors | Swastik Hospital",
  description: "Meet our team of experienced and compassionate doctors.",
};

const clinicStats = [
    { icon: Users, value: "50,000+", label: "Patients Treated" },
    { icon: Award, value: "25+", label: "Awards Won" },
    { icon: Clock, value: "20+", label: "Years of Service" },
    { icon: Stethoscope, value: "15+", label: "Specializations" },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Our Medical Team
            </span>
            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Meet Our Expert Doctors
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Our team of highly qualified and experienced physicians is committed to providing exceptional healthcare with compassion and expertise.
            </p>
          </div>
        </section>

        <section className="bg-card py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {clinicStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <stat.icon className="size-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground md:text-3xl">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Our Specialists</h2>
              <p className="mt-4 text-muted-foreground">
                Dedicated professionals committed to your health and well-being
              </p>
            </div>
            <DoctorsCarousel />
          </div>
        </section>

        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground">Ready to Schedule an Appointment?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">
              Choose from our team of expert physicians and book your consultation today.
            </p>
            <a href="/appointments" className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-background px-6 py-3 font-medium text-foreground transition-colors hover:bg-background/90">
              Book Appointment
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}