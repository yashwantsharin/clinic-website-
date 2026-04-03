'use client'

import { useState } from "react";
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ServicesSection } from "@/components/home/services-section"
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section"
import { Award, Users, Stethoscope, Clock, MapPin, Phone, Mail, CalendarDays, CheckCircle } from "lucide-react";
import { AppointmentForm } from "@/components/appointments/appointment-form"
import { Card, CardContent } from "@/components/ui/card"
import { CircularTestimonials } from "@/components/circular-testimonials";
import { ReviewsList } from "@/components/reviews/reviews-list";
import { ReviewForm } from "@/components/reviews/review-form";
import { Button } from "@/components/ui/button";

const doctors = [
  { name: "Dr. Rahul Raj", designation: "Emergency", quote: "Dedicated to providing the best emergency care with speed and precision.", src: "/images/doctors/dr-rahul-raj.jpg" },
  { name: "Dr. Nihal Singh", designation: "Orthopedic | MBBS", quote: "Committed to restoring mobility and improving quality of life through expert orthopedic care.", src: "/images/doctors/dr-nihal-singh.jpg" },
  { name: "Dr. Manoj Kumar", designation: "Medicine | MBBS (Hons.), MD (Bangalore)", quote: "Providing compassionate and evidence-based medical care for all patients.", src: "/images/doctors/dr-manoj-kumar.jpg" },
  { name: "Dr. Ritu Ranjan Jha", designation: "Obg & Gynec | MBBS (Hons.), Stri evam Prasav Rog Visheshagya", quote: "Ensuring the health and well-being of women at every stage of life.", src: "/images/doctors/dr-ritu-ranjan-jha.jpg" },
  { name: "Dr. Anjali Raj", designation: "Physiotherapy | BPT (Delhi)", quote: "Helping patients regain strength and movement through personalized physiotherapy.", src: "/images/doctors/dr-anjali-raj.jpg" },
  { name: "Dr. Rohit Kumar", designation: "Ayurveda | BAMS", quote: "Blending ancient Ayurvedic wisdom with modern healthcare for holistic healing.", src: "/images/doctors/dr-rohit-kumar.jpg" },
  { name: "Dr. RajRani K.", designation: "Obg & Gynec | MBBS", quote: "Committed to safe motherhood and comprehensive women's healthcare.", src: "/images/doctors/dr-rajrani-k.jpg" },
  { name: "Dr. Janu Raj", designation: "Surgery | MBBS", quote: "Performing precise and safe surgical procedures with utmost care.", src: "/images/doctors/dr-janu-raj.jpg" },
  { name: "Dr. Ashish Gupta", designation: "Anesthesia | MBBS MD (Anaesthesia)", quote: "Ensuring patient comfort and safety during every surgical procedure.", src: "/images/doctors/dr-ashish-gupta.jpg" },
  { name: "Dr. Nandani K.", designation: "Dental | BDS", quote: "Delivering quality dental care with a gentle and patient-friendly approach.", src: "/images/doctors/dr-nandani-k.jpg" },
  { name: "Dr. Sudipta Das", designation: "Orthopedic | MBBS MS (Ortho)", quote: "Specialized in advanced orthopedic treatments for a pain-free life.", src: "/images/doctors/dr-sudipta-das.jpg" },
  { name: "Dr. Afzal Husain Kasmi", designation: "Surgery | MBBS MS", quote: "Bringing surgical excellence and compassionate care to every patient.", src: "/images/doctors/dr-afzal-husain-kasmi.jpg" },
];

const clinicStats = [
    { icon: Users, value: "50,000+", label: "Patients Treated" },
    { icon: Award, value: "25+", label: "Awards Won" },
    { icon: Clock, value: "20+", label: "Years of Service" },
    { icon: Stethoscope, value: "15+", label: "Specializations" },
]

const benefits = [
  "Flexible scheduling to fit your needs",
  "Short wait times",
  "Comprehensive medical services",
  "Insurance accepted",
  "Same-day appointments available",
]


export default function HomePage() {
  const [reviewMode, setReviewMode] = useState<'view' | 'write'>('view');

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <section id="home">
          <HeroSection />
          <ServicesSection />
          <WhyChooseUsSection />
        </section>

        <section id="about" className="bg-background py-16 md:py-24">
        <div className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16 md:py-24">
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
        </div>

        <div className="bg-card py-12">
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
        </div>

        <div className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Our Specialists</h2>
              <p className="mt-4 text-muted-foreground">
                Dedicated professionals committed to your health and well-being
              </p>
            </div>
            <div className="flex justify-center">
                <CircularTestimonials testimonials={doctors} autoplay={true} />
            </div>
          </div>
        </div>
        </section>

        <section id="appointments" className="bg-background py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4">
             <div className="text-center mb-12">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Appointments
              </span>
              <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Schedule Your Visit
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
                Book your appointment online and take the first step towards better health. 
                Our team is ready to provide you with excellent care.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <AppointmentForm />
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <Clock className="size-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">Opening Hours</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-medium text-foreground">9:00 AM - 6:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Saturday</span>
                        <span className="font-medium text-foreground">9:00 AM - 1:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-medium text-foreground">Closed</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <Phone className="size-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">Contact Us</h3>
                    </div>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="size-4 text-primary" />
                        <span>+91 9973622731</span>
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="size-4 text-primary" />
                        <span>contact@swastikhospital.com</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                        <a
                          href="https://share.google/nKY1rZosZW4khSRoF"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline-offset-4 hover:underline"
                        >
                          View on Google Maps
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <CalendarDays className="size-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">Why Book With Us</h3>
                    </div>
                    <ul className="space-y-3">
                      {benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="bg-background py-12">
          <div className="mx-auto max-w-4xl px-4">
              <div className="text-center mb-12">
                  <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                      Testimonials
                  </span>
                  <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                      What Our Patients Say
                  </h1>
                  <p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                      Read heartfelt stories from patients who have experienced our exceptional care. Your feedback helps us grow and continue to serve our community better.
                  </p>
              </div>
              <div className="flex justify-center mb-8 gap-4">
                <Button 
                  onClick={() => setReviewMode('view')} 
                  variant={reviewMode === 'view' ? 'default' : 'outline'}
                >
                  View Reviews
                </Button>
                <Button 
                  onClick={() => setReviewMode('write')}
                  variant={reviewMode === 'write' ? 'default' : 'outline'}
                >
                  Write a Review
                </Button>
              </div>
              <div>
                {reviewMode === 'view' ? <ReviewsList /> : <ReviewForm onReviewSubmit={() => setReviewMode('view')} />}
              </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
