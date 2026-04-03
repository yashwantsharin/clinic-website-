import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Siren, Bone, Stethoscope, Baby, HeartPulse, Leaf, Scissors, Bed, Smile } from "lucide-react";

const services = [
    {
        name: "Emergency",
        icon: Siren,
        specialty: "emergency",
    },
    {
        name: "Orthopedic",
        icon: Bone,
        specialty: "orthopedic",
    },
    {
        name: "Medicine",
        icon: Stethoscope,
        specialty: "medicine",
    },
    {
        name: "Obg & Gynec",
        icon: Baby,
        specialty: "obg-gynec",
    },
    {
        name: "Physiotherapy",
        icon: HeartPulse,
        specialty: "physiotherapy",
    },
    {
        name: "Ayurveda",
        icon: Leaf,
        specialty: "ayurveda",
    },
    {
        name: "Surgery",
        icon: Scissors,
        specialty: "surgery",
    },
    {
        name: "Anesthesia",
        icon: Bed,
        specialty: "anesthesia",
    },
    {
        name: "Dental",
        icon: Smile,
        specialty: "dental",
    },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-12 md:py-16">
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
            <Link key={service.name} href={`/about?specialty=${service.specialty}`} className="h-full">
              <Card className="flex h-full flex-col items-center justify-center p-6 text-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
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
