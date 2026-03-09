"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ReviewForm } from "@/components/reviews/review-form"
import { ReviewsList, useReviewsMutate } from "@/components/reviews/reviews-list"

export default function ReviewsPage() {
  const mutate = useReviewsMutate()

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-12">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Patient Reviews
            </span>
            <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              What Our Patients Say
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              Read reviews from our valued patients and share your own experience with us.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="bg-background py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Review Form */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <ReviewForm onReviewSubmitted={mutate} />
                </div>
              </div>

              {/* Reviews List */}
              <div className="lg:col-span-2">
                <ReviewsList />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
