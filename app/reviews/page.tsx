'use client'

import { useState } from "react"
import useSWR from "swr"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ReviewForm } from "@/components/reviews/review-form"
import { ReviewsList, type Review } from "@/components/reviews/reviews-list"
import { Button } from "@/components/ui/button"

// Firestore data fetcher
const fetcher = async (collectionPath: string): Promise<Review[]> => {
  const q = query(collection(db, collectionPath), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Review[];
};

export default function ReviewsPage() {
  const [mode, setMode] = useState<'form' | 'list'>('form');
  const { data: reviews, error, mutate } = useSWR<Review[]>("reviews", fetcher);

  const handleReviewSubmitted = () => {
    mutate(); // Re-fetch reviews
    setMode('list'); // Switch to list view
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/10 via-background to-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center">
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
        </section>

        <section className="bg-background py-12">
          <div className="mx-auto max-w-4xl px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Customer Reviews</h2>
              <Button variant="outline" onClick={() => setMode(mode === 'form' ? 'list' : 'form')}>
                {mode === 'form' ? 'View Reviews' : 'Write a Review'}
              </Button>
            </div>

            <div className="transition-opacity duration-300 ease-in-out">
              {mode === 'form' ? (
                <div key="form" className="animate-in fade-in">
                  <div className="mx-auto max-w-2xl">
                    <ReviewForm onReviewSubmitted={handleReviewSubmitted} />
                  </div>
                </div>
              ) : (
                <div key="list" className="animate-in fade-in">
                  <ReviewsList reviews={reviews} isLoading={!reviews && !error} error={error} />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
