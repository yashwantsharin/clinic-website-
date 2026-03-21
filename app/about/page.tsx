'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { DoctorsCarousel } from "@/components/about/doctors-carousel";
import { CtaSection } from "@/components/home/cta-section";

function AboutPageContent() {
  const searchParams = useSearchParams();
  const specialty = searchParams.get('specialty');

  return (
    <>
      <section className="py-12 md:py-20 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                About Us
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                We are dedicated to providing compassionate, high-quality healthcare. Our team of experienced professionals is here to serve you and your family.
            </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Doctors
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Meet our team of dedicated and experienced medical professionals.
            </p>
          </div>
          <DoctorsCarousel specialty={specialty} />
        </div>
      </section>
      <CtaSection />
    </>
  )
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutPageContent />
    </Suspense>
  )
}
