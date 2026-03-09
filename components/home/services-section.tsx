import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Baby, Bone, Eye, Stethoscope } from "lucide-react";

const services = [
    {
        name: "General Checkup",
        icon: Stethoscope,
        specialty: "general-checkup",
    },
    {
        name: "Cardiology",
        icon: Heart,
        specialty: "cardiology",
    },
    {
        name: "Neurology",
        icon: Brain,
        specialty: "neurology",
    },
    {
        name: "Pediatrics",
        icon: Baby,
        specialty: "pediatrics",
    },
    {
        name: "Orthopedics",
        icon: Bone,
        specialty: "orthopedics",
    },
    {
        name: "Ophthalmology",
        icon: Eye,
        specialty: "ophthalmology",
    },
];

export function ServicesSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive care across all major specialties.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.name} href={`/about?specialty=${service.specialty}`}>
              <Card className="flex flex-col items-center justify-center p-6 text-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <service.icon className="mb-4 size-12 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">{service.name}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
