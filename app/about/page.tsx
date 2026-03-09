import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { DoctorsCarousel } from "@/components/about/doctors-carousel";
import { GraduationCap, Award, Heart, Users, Stethoscope, Clock } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Our Doctors | Swastik Hospital",
  description: "Meet our team of experienced and compassionate doctors dedicated to providing quality healthcare.",
};

const clinicStats = [
    {
      icon: Users,
      value: "50,000+",
      label: "Patients Treated",
    },
    {
      icon: Award,
      value: "25+",
      label: "Awards Won",
    },
    {
      icon: Clock,
      value: "20+",
      label: "Years of Service",
    },
    {
      icon: Stethoscope,
      value: "15+",
      label: "Specializations",
    },
  ]

export default function AboutPage({ searchParams }: { searchParams: { specialty: string } }) {
  const specialty = searchParams.specialty;

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Our Medical Team
            </span>
            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Meet Our Expert Doctors
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Our team of highly qualified and experienced physicians is committed to providing exceptional healthcare with compassion and expertise. Each doctor brings unique skills and specializations to ensure comprehensive care for all patients.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-card py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-4">
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

        {/* Doctors Carousel */}
        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Our Specialists</h2>
              <p className="mt-4 text-muted-foreground">
                Dedicated professionals committed to your health and well-being
              </p>
              {specialty && (
                <p className="mt-2 text-lg font-semibold text-primary capitalize">
                  Showing doctors for: {specialty}
                </p>
              )}
            </div>
            <div className="px-0">
              <DoctorsCarousel specialty={specialty} />
            </div>
          </div>
        </section>

        {/* Why Choose Our Team */}
        <section className="bg-muted/50 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">
                  Why Choose Our Medical Team?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <GraduationCap className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Highly Qualified</h3>
                      <p className="text-muted-foreground">
                        All our doctors are board-certified with degrees from top medical institutions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Heart className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Compassionate Care</h3>
                      <p className="text-muted-foreground">
                        We treat every patient with empathy, respect, and personalized attention.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Award className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Award-Winning</h3>
                      <p className="text-muted-foreground">
                        Recognized for excellence in patient care and medical innovation.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Stethoscope className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Modern Technology</h3>
                      <p className="text-muted-foreground">
                        Equipped with state-of-the-art diagnostic and treatment facilities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative mt-8 lg:mt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
                        <Image
                          src="/images/doctors/dr-sarah-johnson.jpg"
                          alt="Dr. Sarah Johnson"
                          width={200}
                          height={267}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
                        <Image
                          src="/images/doctors/dr-michael-chen.jpg"
                          alt="Dr. Michael Chen"
                          width={200}
                          height={200}
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="mt-8 space-y-4">
                      <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
                        <Image
                          src="/images/doctors/dr-emily-rodriguez.jpg"
                          alt="Dr. Emily Rodriguez"
                          width={200}
                          height={200}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
                        <Image
                          src="/images/doctors/dr-james-wilson.jpg"
                          alt="Dr. James Wilson"
                          width={200}
                          height={267}
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-6 -top-6 size-32 rounded-full bg-primary/10 blur-3xl" />
                  <div className="absolute -bottom-6 -left-6 size-32 rounded-full bg-accent/20 blur-3xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground">
              Ready to Schedule an Appointment?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">
              Choose from our team of expert physicians and book your consultation today. 
              Experience personalized, compassionate care from the best in the field.
            </p>
            <a
              href="/appointments"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-background px-6 py-3 font-medium text-foreground transition-colors hover:bg-background/90"
            >
              Book Appointment
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
