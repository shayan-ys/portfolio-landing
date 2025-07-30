"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  blurDataURL: string
  onLoad?: () => void
  onClick?: () => void
  className?: string
  priority?: boolean
  sizes?: string
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  blurDataURL,
  onLoad,
  onClick,
  className = "",
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw",
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        aspectRatio: `${width} / ${height}`,
      }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      aria-label={onClick ? `View ${alt} in lightbox` : alt}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        placeholder="blur"
        blurDataURL={blurDataURL}
        priority={priority}
        sizes={sizes}
        onLoad={handleLoad}
        quality={85}
      />

      {/* Loading state indicator for accessibility */}
      {!isLoaded && (
        <div className="sr-only" aria-live="polite">
          Loading image...
        </div>
      )}

      {/* Click overlay when not fully loaded */}
      {!isLoaded && onClick && <div className="absolute inset-0 cursor-not-allowed" />}

      {/* Hover effect when fully loaded */}
      {isLoaded && onClick && (
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200 cursor-pointer" />
      )}
    </div>
  )
}

export default OptimizedImage
