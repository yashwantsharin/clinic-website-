'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"

interface Doctor {
  id: number
  name: string
  specialty: string
  department: string
  degree: string
  image: string
}

export function DoctorsCarousel({ specialty }: { specialty: string | null }) {
  const [api, setApi] = useState<CarouselApi>()
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Rahul Raj",
      specialty: "emergency",
      department: "Director",
      degree: "",
      image: "/images/doctors/dr-rahul-raj.jpg",
    },
    {
      id: 2,
      name: "Dr. Nihal Singh",
      specialty: "orthopedic",
      department: "",
      degree: "MBBS",
      image: "/images/doctors/dr-nihal-singh.jpg",
    },
    {
      id: 3,
      name: "Dr. Manoj Kumar",
      specialty: "medicine",
      department: "",
      degree: "MBBS (Hons.), MD (Bangalore)",
      image: "/images/doctors/dr-manoj-kumar.jpg",
    },
    {
      id: 4,
      name: "Dr. Ritu Ranjan Jha",
      specialty: "obg-gynec",
      department: "",
      degree: "MBBS (Hons.), Stri evam Prasav Rog Visheshagya",
      image: "/images/doctors/dr-ritu-ranjan-jha.jpg",
    },
    {
      id: 5,
      name: "Dr. Anjali Raj",
      specialty: "physiotherapy",
      department: "",
      degree: "BPT (Delhi)",
      image: "/images/doctors/dr-anjali-raj.jpg",
    },
    {
      id: 6,
      name: "Dr. Rohit Kumar",
      specialty: "ayurveda",
      department: "",
      degree: "BAMS",
      image: "/images/doctors/dr-rohit-kumar.jpg",
    },
    {
      id: 7,
      name: "Dr. RajRani K.",
      specialty: "obg-gynec",
      department: "",
      degree: "MBBS",
      image: "/images/doctors/dr-rajrani-k.jpg",
    },
    {
      id: 8,
      name: "Dr. Janu Raj",
      specialty: "surgery",
      department: "",
      degree: "MBBS",
      image: "/images/doctors/dr-janu-raj.jpg",
    },
    {
      id: 9,
      name: "Dr. Ashish Gupta",
      specialty: "anesthesia",
      department: "",
      degree: "MBBS MD (Anaesthesia)",
      image: "/images/doctors/dr-ashish-gupta.jpg",
    },
    {
      id: 10,
      name: "Dr. Nandani K.",
      specialty: "dental",
      department: "",
      degree: "BDS",
      image: "/images/doctors/dr-nandani-k.jpg",
    },
    {
      id: 11,
      name: "Dr. Sudipta Das",
      specialty: "orthopedic",
      department: "",
      degree: "MBBS MS (Ortho)",
      image: "/images/doctors/dr-sudipta-das.jpg",
    },
    {
      id: 12,
      name: "Dr. Afzal Husain Kasmi",
      specialty: "surgery",
      department: "",
      degree: "MBBS MS",
      image: "/images/doctors/dr-afzal-husain-kasmi.jpg",
    }
  ];

  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);

  useEffect(() => {
    if (specialty) {
      const specialtyDoctors = doctors.filter(
        (d) => d.specialty.toLowerCase() === specialty.toLowerCase()
      );
      setFilteredDoctors(specialtyDoctors);
      if (specialtyDoctors.length > 0) {
        setTimeout(() => {
          if (api) {
            api.scrollTo(0);
            setActiveCard(0);
          }
        }, 100);
      }
    } else {
      setFilteredDoctors(doctors);
      setActiveCard(null);
    }
  }, [specialty, api]);

  if (filteredDoctors.length === 0) {
    return <p className="text-center text-muted-foreground">No doctors found for this specialty.</p>
  }

  return (
    <Carousel 
      setApi={setApi}
      opts={{ align: "start", loop: false }}
      className="w-full"
    >
      <CarouselContent>
        {filteredDoctors.map((doctor, index) => (
          <CarouselItem key={doctor.id} className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <div className="p-2">
              <div 
                className="group relative aspect-[3/4] overflow-hidden rounded-xl shadow-lg"
                onClick={() => setActiveCard(activeCard === index ? null : index)}
              >
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={400}
                    height={533}
                    className="size-full object-cover object-top transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div 
                    className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4 text-white transition-transform duration-500 ease-in-out ${
                      activeCard === index ? 'translate-y-0' : 'translate-y-full'
                    } md:translate-y-full md:group-hover:translate-y-0`}
                  >
                    <h3 className="text-xl font-bold tracking-tight">{doctor.name}</h3>
                    {doctor.degree && <p className="text-sm font-light text-white/80">{doctor.degree}</p>}
                    <div className="mt-3 h-px bg-white/20" />
                    <div className="mt-3 flex items-center justify-between gap-2">
                        <p className="text-base font-semibold">{doctor.specialty}</p>
                        {doctor.department && <p className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{doctor.department}</p>}
                    </div>
                  </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
      <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
    </Carousel>
  )
}
