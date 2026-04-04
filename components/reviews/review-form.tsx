"use client"

import { useState } from "react"
import { db } from "@/lib/firebase/client"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { StarRating } from "./star-rating"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle, AlertCircle } from "lucide-react"

interface ReviewFormProps {
  onReviewSubmitted?: () => void
}

export function ReviewForm({ onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    if (rating === 0) {
      setSubmitStatus("error")
      setErrorMessage("Please select a rating")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    const formData = new FormData(e.currentTarget)
    const data = {
      patient_name: formData.get("name") as string,
      rating,
      review_text: formData.get("review") as string,
    }

    try {
        await addDoc(collection(db, "reviews"), {
            ...data,
            createdAt: serverTimestamp()
        })

        setSubmitStatus("success")
        setRating(0)
        e.currentTarget.reset()
        onReviewSubmitted?.()
    } catch (error) {
        console.error("Error submitting review:", error)
        setSubmitStatus("error")
        setErrorMessage("Failed to submit review. Please try again.")
    } finally {
        setIsSubmitting(false)
    }
  }

  if (submitStatus === "success") {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="size-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-green-800">Thank You!</h3>
          <p className="mt-2 max-w-sm text-green-700">
            Your review has been submitted successfully. We appreciate your feedback!
          </p>
          <Button 
            onClick={() => setSubmitStatus("idle")} 
            className="mt-6"
          >
            Write Another Review
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Experience</CardTitle>
        <CardDescription>
          Your feedback helps us improve and helps others make informed decisions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Your Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
              />
            </Field>

            <Field>
              <FieldLabel>Your Rating</FieldLabel>
              <div className="flex items-center gap-3">
                <StarRating
                  rating={rating}
                  onRatingChange={setRating}
                  interactive
                  size="lg"
                />
                <span className="text-sm text-muted-foreground">
                  {rating > 0 ? `${rating} out of 5 stars` : "Click to rate"}
                </span>
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="review">Your Review</FieldLabel>
              <Textarea
                id="review"
                name="review"
                placeholder="Share your experience with us..."
                rows={4}
                required
              />
            </Field>

            {submitStatus === "error" && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="size-4" />
                <span>{errorMessage || "Something went wrong. Please try again."}</span>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner className="size-4" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
