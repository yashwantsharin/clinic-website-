"use client"

import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { StarRating } from "./star-rating"
import { Spinner } from "@/components/ui/spinner"
import { User } from "lucide-react"

interface Review {
  id: string
  patient_name: string
  rating: number
  review_text: string
  created_at: string
}

async function fetchReviews(): Promise<Review[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export function ReviewsList() {
  const { data: reviews, error, isLoading, mutate } = useSWR("reviews", fetchReviews, {
    revalidateOnFocus: false,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Unable to load reviews. Please try again later.
      </div>
    )
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No reviews yet. Be the first to share your experience!
      </div>
    )
  }

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card className="bg-primary/5">
        <CardContent className="flex flex-col items-center justify-center py-6 text-center sm:flex-row sm:gap-8 sm:text-left">
          <div>
            <p className="text-5xl font-bold text-primary">{averageRating.toFixed(1)}</p>
            <StarRating rating={Math.round(averageRating)} size="lg" />
          </div>
          <div className="mt-4 sm:mt-0">
            <p className="text-lg font-medium text-foreground">
              Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
            </p>
            <p className="text-sm text-muted-foreground">
              Our patients trust us for quality care
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <User className="size-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{review.patient_name}</h4>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <time className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <p className="mt-3 text-muted-foreground">{review.review_text}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function useReviewsMutate() {
  const { mutate } = useSWR("reviews", fetchReviews)
  return mutate
}
