
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "./star-rating";

export interface Review {
  id: string;
  patient_name: string;
  rating: number;
  review_text: string;
  createdAt: any; // Using 'any' for simplicity, consider a more specific type
}

interface ReviewsListProps {
  reviews: Review[];
  isLoading: boolean;
  error: any;
}

export function ReviewsList({ reviews, isLoading, error }: ReviewsListProps) {
  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>Error loading reviews: {error.message}</div>;
  }

  if (reviews.length === 0) {
    return <div>No reviews yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader>
            <CardTitle>{review.patient_name}</CardTitle>
            <StarRating rating={review.rating} />
          </CardHeader>
          <CardContent>
            <p>{review.review_text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
