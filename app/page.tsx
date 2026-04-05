
"use client";

import { HeroSection } from "@/components/home/hero-section";
import { ServicesSection } from "@/components/home/services-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";
import { CtaSection } from "@/components/home/cta-section";
import { ReviewsContainer } from "@/components/reviews/reviews-container";
import { ReviewForm } from "@/components/reviews/review-form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState("view");

  return (
    <main className="flex-1">
      <HeroSection />
      <ServicesSection />
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-24">
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
