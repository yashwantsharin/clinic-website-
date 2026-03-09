import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, Heart, Baby, Brain, Bone, Eye } from "lucide-react"

const services = [
  {
    icon: Stethoscope,
    title: "General Check-ups",
    description: "Comprehensive health assessments and preventive care to keep you healthy.",
  },
  {
    icon: Heart,
    title: "Cardiology",
    description: "Expert cardiac care including heart health monitoring and treatment.",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description: "Specialized healthcare for infants, children, and adolescents.",
  },
  {
    icon: Brain,
    title: "Neurology",
    description: "Diagnosis and treatment of nervous system disorders.",
  },
  {
    icon: Bone,
    title: "Orthopedics",
    description: "Care for bones, joints, and musculoskeletal conditions.",
  },
  {
    icon: Eye,
    title: "Ophthalmology",
    description: "Complete eye care services including vision tests and treatments.",
  },
]

export function ServicesSection() {
  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Our Services
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Comprehensive Healthcare Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            We offer a wide range of medical services to meet all your healthcare needs under one roof.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card 
              key={service.title} 
              className="group transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                  <service.icon className="size-7 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
