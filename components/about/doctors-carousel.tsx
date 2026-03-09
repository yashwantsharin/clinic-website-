"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { GraduationCap, Clock } from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const doctors = [
    {
        id: 8,
        name: "Dr Rahul Raj",
        title: "Chief Medical Officer",
        specialty: "general-checkup",
        experience: "15+ years",
        education: "AIIMS, New Delhi",
        specializations: ["General Medicine", "Preventive Care", "Health Checkups"],
        image: "/images/doctors/dr-rahul-raj.jpg",
        bio: "Experienced medical professional leading the clinic and providing comprehensive healthcare services."
    },
    {
      id: 1,
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
      id: 2,
      name: "Dr. David Thompson",
      title: "Lead Neurologist",
      specialty: "Neurology",
      image: "/images/doctors/dr-david-thompson.jpg",
      experience: "25+ years",
      education: "University of Pennsylvania",
      specializations: ["Stroke", "Epilepsy", "Movement Disorders"],
      bio: "A seasoned physician with extensive experience in managing complex neurological conditions.",
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
      title: "Ophthalmologist",
      specialty: "Ophthalmology",
      image: "/images/doctors/dr-lisa-patel.jpg",
      experience: "12+ years",
      education: "Columbia University",
      specializations: ["Cataract Surgery", "Glaucoma", "Retinal Disorders"],
      bio: "Expert in diagnosing and treating eye conditions with a holistic approach to vision health.",
    },
    {
      id: 6,
      name: "Dr. Sarah Johnson",
      title: "Consultant Neurologist",
      specialty: "Neurology",
      image: "/images/doctors/dr-sarah-johnson.jpg",
      experience: "15+ years",
      education: "Harvard Medical School",
      specializations: ["Multiple Sclerosis", "Headache Medicine", "Neuromuscular Disorders"],
      bio: "A compassionate neurologist focused on patient-centered care and innovative treatments.",
    },
     {
      id: 7,
      name: "Dr. Robert Davis",
      title: "Consultant Cardiologist",
      specialty: "Cardiology",
      image: "/images/doctors/dr-michael-chen.jpg",
      experience: "22+ years",
      education: "Duke University School of Medicine",
      specializations: ["Echocardiography", "Coronary Artery Disease", "Arrhythmias"],
      bio: "Dedicated to preventing and treating heart disease through advanced diagnostics and patient education."
    }
  ];

export function DoctorsCarousel({ specialty }: { specialty?: string }) {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const filteredDoctors = specialty
    ? doctors.filter(doctor => doctor.specialty.toLowerCase() === specialty.toLowerCase())
    : doctors;

  if (filteredDoctors.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No doctors found for this specialty.</p>
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: filteredDoctors.length > 1, // Only loop if there's more than one doctor
      }}
      plugins={[plugin.current]}
      className="mx-auto w-full max-w-6xl"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {filteredDoctors.map((doctor) => (
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
      {filteredDoctors.length > 1 && (
        <>
          <CarouselPrevious className="-left-4 border-primary/20 bg-card text-primary hover:bg-primary hover:text-primary-foreground md:-left-12" />
          <CarouselNext className="-right-4 border-primary/20 bg-card text-primary hover:bg-primary hover:text-primary-foreground md:-right-12" />
        </>
      )}
    </Carousel>
  );
}
