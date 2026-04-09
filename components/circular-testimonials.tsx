'use client';
import React, {
  useEffect, useRef, useState, useMemo, useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
}

const getInitials = (name: string) => {
  if (!name) return "";
  const nameParts = name.split(' ');
  if (nameParts.length > 1) {
    return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const CircularTestimonials = ({
  testimonials, autoplay = true,
}: CircularTestimonialsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);

  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const swipeX = touchEnd - touchStart;

    if (swipeX < -50) {
      handleNext();
    } else if (swipeX > 50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  const getCardStyle = (index: number): React.CSSProperties => {
    let transform = 'scale(0.8)';
    let opacity = 0;
    let zIndex = -1;
    let position: 'absolute' | 'relative' = 'absolute';

    if (index === activeIndex) {
        transform = 'translateX(0) rotate(0deg) scale(1)';
        opacity = 1;
        zIndex = 10;
        position = 'relative';
    } else if (index === (activeIndex - 1 + testimonialsLength) % testimonialsLength) {
        transform = 'translateX(-65%) rotate(-8deg) scale(0.75)';
        opacity = 0.4;
        zIndex = 0;
    } else if (index === (activeIndex + 1) % testimonialsLength) {
        transform = 'translateX(65%) rotate(8deg) scale(0.75)';
        opacity = 0.4;
        zIndex = 0;
    }

    return {
        transform,
        opacity,
        zIndex,
        position,
    };
  };

  const activeDoctor = testimonials[activeIndex];

  return (
    <div className="flex items-center gap-8 testimonial-container-rewrite">
      <div className="w-full max-w-md">
        <div
          className="card-stack"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name + index}
              className={`card-wrapper ${index === activeIndex ? 'center' : ''}`}
              style={getCardStyle(index)}
            >
              {testimonial.src ? (
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  className="doctor-image"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = document.createElement('div');
                    placeholder.className = "image-placeholder";
                    placeholder.innerHTML = `<span>${getInitials(testimonial.name)}</span>`;
                    target.parentElement?.appendChild(placeholder);
                  }}
                />
              ) : (
                <div className="image-placeholder">
                  <span>{getInitials(testimonial.name)}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="navigation-controls">
          <button className="arrow-button" onClick={handlePrev} aria-label="Previous testimonial">
            <FaArrowLeft size={20} />
          </button>
          <div className="text-indicator">
            {activeIndex + 1} / {testimonialsLength}
          </div>
          <button className="arrow-button" onClick={handleNext} aria-label="Next testimonial">
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="doctor-info">
        <h2 className="doctor-name">{activeDoctor.name}</h2>
        <p className="doctor-designation">{activeDoctor.designation}</p>
        <p className="doctor-quote">{activeDoctor.quote}</p>
      </div>

      <style jsx>{`
        .testimonial-container-rewrite {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
          gap: 2rem;
        }

        .card-stack {
            position: relative;
            width: 320px;
            height: 380px;
            margin: 0 auto;
            overflow: hidden;
        }

        .card-wrapper {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: white;
            border-radius: 1.5rem; /* rounded-3xl */
            transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
            overflow: hidden;
        }

        .card-wrapper.center {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* shadow-2xl */
        }

        .doctor-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
        }

        .image-placeholder {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #e0f2fe; /* bg-blue-100 */
        }

        .image-placeholder span {
            color: #2563eb; /* text-blue-600 */
            font-size: 3rem;
            font-weight: bold;
        }

        .doctor-info {
          max-width: 400px;
        }
        .doctor-name {
          font-size: 1.5rem; /* text-2xl */
          font-weight: bold;
          color: #111827;
        }
        .doctor-designation {
          font-size: 1rem; /* text-base */
          color: #6b7280;
          margin-bottom: 1rem;
        }
        .doctor-quote {
          font-size: 1rem; /* text-base */
          color: #4b5563;
          line-height: 1.6;
        }

        .navigation-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .arrow-button {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 1px solid #e5e7eb;
          color: #4b5563;
          transition: all 0.2s;
        }
        .arrow-button:hover {
          background: #f3f4f6;
          transform: translateY(-2px);
        }
        .text-indicator {
          color: #6b7280;
          font-size: 1rem;
          font-weight: 500;
          min-width: 50px;
          text-align: center;
        }

        @media (max-width: 900px) {
          .testimonial-container-rewrite {
            flex-direction: column;
          }
          .doctor-info {
            text-align: center;
            margin-top: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CircularTestimonials;
