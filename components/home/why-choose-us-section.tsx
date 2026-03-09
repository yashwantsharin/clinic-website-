import { CheckCircle, Clock, Shield, Users } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Expert Medical Team",
    description: "Our team of board-certified physicians brings decades of combined experience.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Convenient appointment times from 9AM to 6PM, Monday through Friday.",
  },
  {
    icon: Shield,
    title: "Modern Facilities",
    description: "State-of-the-art medical equipment and comfortable, clean facilities.",
  },
  {
    icon: CheckCircle,
    title: "Patient-Centered Care",
    description: "We prioritize your comfort and involve you in every healthcare decision.",
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Why Choose Us
              </span>
              <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
                Trusted Healthcare for Your Entire Family
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                For over 15 years, we have been dedicated to providing exceptional medical care 
                with a personal touch. Our commitment to excellence sets us apart.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl bg-primary/10 p-6 text-center">
                  <p className="text-4xl font-bold text-primary">15+</p>
                  <p className="mt-1 text-sm text-muted-foreground">Years of Experience</p>
                </div>
                <div className="rounded-2xl bg-accent/50 p-6 text-center">
                  <p className="text-4xl font-bold text-primary">10K+</p>
                  <p className="mt-1 text-sm text-muted-foreground">Patients Treated</p>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-accent/50 p-6 text-center">
                  <p className="text-4xl font-bold text-primary">98%</p>
                  <p className="mt-1 text-sm text-muted-foreground">Patient Satisfaction</p>
                </div>
                <div className="rounded-2xl bg-primary/10 p-6 text-center">
                  <p className="text-4xl font-bold text-primary">24/7</p>
                  <p className="mt-1 text-sm text-muted-foreground">Emergency Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
