"use client";
import { Card, CardContent } from "@/components/ui/card" 
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { GraduationCap, Clock } from "lucide-react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

const doctors = [
  {
    id: 1,
    name: "Dr. Rahul raj ",
    title: "Chief Medical Officer",
    specialty: "Family Medicine",
    image: "/images/doctors/dr-sarah-johnson.jpg",
    experience: "3+ years",
    education: "Harvard Medical School",
    specializations: ["Family Medicine", "Preventive Care", "Women's Health"],
    bio: "A highly skilled and compassionate physician dedicated to providing comprehensive healthcare services to patients of all ages.",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    title: "Senior Cardiologist",
    specialty: "Cardiology",
    image: "/images/doctors/dr-michael-chen.jpg",
    experience: "20+ years",
    education: "Johns Hopkins University",
    specializations: ["Cardiovascular Disease", "Interventional Cardiology", "Heart Failure"],
    bio: "An expert in diagnosing and treating heart conditions with a focus on minimally invasive procedures.",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    title: "Pediatric Specialist",
    specialty: "Pediatrics",
    image: "/images/doctors/dr-emily-rodriguez.jpg",
    experience: "10+ years",
    education: "Stanford University",
    specializations: ["Pediatric Care", "Child Development", "Immunizations"],
    bio: "Passionate about children's health and development, providing gentle and thorough care for young patients.",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    title: "Orthopedic Surgeon",
    specialty: "Orthopedics",
    image: "/images/doctors/dr-james-wilson.jpg",
    experience: "18+ years",
    education: "Yale School of Medicine",
    specializations: ["Joint Replacement", "Sports Medicine", "Spine Surgery"],
    bio: "Specializing in restoring mobility and quality of life through advanced orthopedic treatments.",
  },
  {
    id: 5,
    name: "Dr. Lisa Patel",
    title: "Dermatologist",
    specialty: "Dermatology",
    image: "/images/doctors/dr-lisa-patel.jpg",
    experience: "12+ years",
    education: "Columbia University",
    specializations: ["Medical Dermatology", "Cosmetic Procedures", "Skin Cancer"],
    bio: "Expert in diagnosing and treating skin conditions with a holistic approach to skin health.",
  },
  {
    id: 6,
    name: "Dr. David Thompson",
    title: "Internal Medicine",
    specialty: "Internal Medicine",
    image: "/images/doctors/dr-david-thompson.jpg",
    experience: "25+ years",
    education: "University of Pennsylvania",
    specializations: ["Chronic Disease Management", "Geriatric Care", "Diabetes"],
    bio: "A seasoned physician with extensive experience in managing complex medical conditions in adults.",
  },
]

export function DoctorsCarousel() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[plugin.current]}
      className="mx-auto w-full max-w-6xl"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {doctors.map((doctor) => (
          <CarouselItem key={doctor.id} className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3">
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <Badge className="bg-primary text-primary-foreground">
                    {doctor.specialty}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
                  <p className="text-sm text-primary">{doctor.title}</p>
                </div>
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {doctor.bio}
                </p>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {doctor.specializations.slice(0, 2).map((spec) => (
                    <Badge key={spec} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="size-3.5" />
                    <span className="truncate">{doctor.education}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    <span>{doctor.experience}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-4 border-primary/20 bg-card text-primary hover:bg-primary hover:text-primary-foreground md:-left-12" />
      <CarouselNext className="-right-4 border-primary/20 bg-card text-primary hover:bg-primary hover:text-primary-foreground md:-right-12" />
    </Carousel>
  )
}
