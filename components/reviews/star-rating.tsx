"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  interactive?: boolean
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
}

export function StarRating({
  rating,
  onRatingChange,
  interactive = false,
  size = "md",
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          onClick={() => interactive && onRatingChange?.(star)}
          disabled={!interactive}
          className={cn(
            "focus:outline-none",
            interactive && "cursor-pointer transition-transform hover:scale-110"
          )}
          aria-label={interactive ? `Rate ${star} stars` : undefined}
        >
          <Star
            className={cn(
              sizeClasses[size],
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted"
            )}
          />
        </button>
      ))}
    </div>
  )
}
