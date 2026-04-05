"use client";

import { HeroSection } from "@/components/home/hero-section";
import { ServicesSection } from "@/components/home/services-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";
import { CtaSection } from "@/components/home/cta-section";
import { ReviewsContainer } from "@/components/reviews/reviews-container";
import { ReviewForm } from "@/components/reviews/review-form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CircularTestimonials } from "@/components/circular-testimonials";
import { AppointmentForm } from "@/components/appointments/appointment-form";
import { useState } from "react";

const doctors = [
  { name: "Dr. Rahul Raj", designation: "Emergency", quote: "Dedicated to providing the best emergency care with speed and precision.", src: "/images/doctors/dr-rahul-raj.jpg" },
  { name: "Dr. Nihal Singh", designation: "Orthopedic | MBBS", quote: "Committed to restoring mobility and improving quality of life.", src: "/images/doctors/dr-nihal-singh.jpg" },
  { name: "Dr. Manoj Kumar", designation: "Medicine | MBBS (Hons.), MD (Bangalore)", quote: "Providing compassionate and evidence-based medical care.", src: "/images/doctors/dr-manoj-kumar.jpg" },
  { name: "Dr. Ritu Ranjan Jha", designation: "Obg & Gynec | MBBS (Hons.)", quote: "Ensuring the health and well-being of women at every stage of life.", src: "/images/doctors/dr-ritu-ranjan-jha.jpg" },
  { name: "Dr. Anjali Raj", designation: "Physiotherapy | BPT (Delhi)", quote: "Helping patients regain strength through personalized physiotherapy.", src: "/images/doctors/dr-anjali-raj.jpg" },
  { name: "Dr. Rohit Kumar", designation: "Ayurveda | BAMS", quote: "Blending Ayurvedic wisdom with modern healthcare for holistic healing.", src: "/images/doctors/dr-rohit-kumar.jpg" },
  { name: "Dr. RajRani K.", designation: "Obg & Gynec | MBBS", quote: "Committed to safe motherhood and comprehensive women's healthcare.", src: "/images/doctors/dr-rajrani-k.jpg" },
  { name: "Dr. Janu Raj", designation: "Surgery | MBBS", quote: "Performing precise and safe surgical procedures with utmost care.", src: "/images/doctors/dr-janu-raj.jpg" },
  { name: "Dr. Ashish Gupta", designation: "Anesthesia | MBBS MD", quote: "Ensuring patient comfort and safety during every surgical procedure.", src: "/images/doctors/dr-ashish-gupta.jpg" },
  { name: "Dr. Nandani K.", designation: "Dental | BDS", quote: "Delivering quality dental care with a gentle patient-friendly approach.", src: "/images/doctors/dr-nandani-k.jpg" },
  { name: "Dr. Sudipta Das", designation: "Orthopedic | MBBS MS (Ortho)", quote: "Specialized in advanced orthopedic treatments for a pain-free life.", src: "/images/doctors/dr-sudipta-das.jpg" },
  { name: "Dr. Afzal Husain Kasmi", designation: "Surgery | MBBS MS", quote: "Bringing surgical excellence and compassionate care to every patient.", src: "/images/doctors/dr-afzal-husain-kasmi.jpg" },
];

export default function Home() {
  const [mode, setMode] = useState("view");

  return (
    <main className="flex-1">
      <div id="home">
        <HeroSection />
      </div>
      <ServicesSection />
      <section id="about" className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">Our Specialists</h2>
            <p className="mt-4 text-muted-foreground">Dedicated professionals committed to your health and well-being</p>
          </div>
          <CircularTestimonials testimonials={doctors} autoplay={true} />
        </div>
      </section>
      <section id="appointments" className="bg-muted/40 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">Book an Appointment</h2>
            <p className="mt-4 text-muted-foreground">Schedule your visit with our expert doctors</p>
          </div>
          <AppointmentForm />
        </div>
      </section>
      <section id="reviews" className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="flex justify-center mb-8">
          <ToggleGroup type="single" value={mode} onValueChange={(value) => value && setMode(value)}>
            <ToggleGroupItem value="view">View Reviews</ToggleGroupItem>
            <ToggleGroupItem value="write">Write Review</ToggleGroupItem>
          </ToggleGroup>
        </div>
        {mode === "view" ? <ReviewsContainer /> : <ReviewForm />}
      </section>
      <WhyChooseUsSection />
      <CtaSection />
    </main>
  );
}