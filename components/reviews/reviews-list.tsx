'use client'

import { Card, CardContent } from "@/components/ui/card"
import { StarRating } from "./star-rating"
import { Spinner } from "@/components/ui/spinner"
import { User } from "lucide-react"
import { Timestamp } from "firebase/firestore"

export interface Review {
  id: string
  name: string
  rating: number
  review: string
  createdAt: Timestamp
}

interface ReviewsListProps {
  reviews: Review[] | undefined
  isLoading: boolean
  error: any
}

// Helper to convert Firestore Timestamp to a readable date
const formatDate = (timestamp: Timestamp) => {
  if (!timestamp) return "Just now";
  return timestamp.toDate().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export function ReviewsList({ reviews, isLoading, error }: ReviewsListProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[300px] rounded-lg border border-dashed border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center py-12 text-center text-destructive">
        <p className="font-semibold">Unable to load reviews.</p>
        <p className="text-sm">Please try again later.</p>
      </div>
    )
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="min-h-[300px] rounded-lg border border-dashed flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
        <p className="font-semibold">No reviews yet.</p>
        <p className="text-sm">Be the first to share your experience!</p>
      </div>
    )
  }

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  return (
    <div className="space-y-6">
      <Card className="bg-primary/5">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-6 text-center sm:flex-row sm:gap-8 sm:text-left">
          <div className="text-center">
            <p className="text-5xl font-bold text-primary">{averageRating.toFixed(1)}</p>
            <StarRating rating={Math.round(averageRating)} size="lg" />
          </div>
          <div className="mt-2 sm:mt-0">
            <p className="text-lg font-medium text-foreground">
              Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
            <p className="text-sm text-muted-foreground">Our patients trust us for quality care</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <User className="size-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{review.name}</h4>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <time className="text-xs text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </time>
                  </div>
                  <p className="mt-3 text-pretty text-muted-foreground">{review.review}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
