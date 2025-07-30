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
      className={cn("relative overflow-hidden group cursor-pointer", className)}
      style={{
        aspectRatio: `${width} / ${height}`,
      }}
      onClick={isLoaded ? onClick : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={
        onClick && isLoaded
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
        className="object-cover transition-all duration-300 group-hover:scale-105"
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

      {/* Hover overlay for loaded images */}
      {isLoaded && onClick && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
      )}

      {/* Loading overlay to prevent clicks during loading */}
      {!isLoaded && <div className="absolute inset-0 bg-transparent cursor-wait" />}
    </div>
  )
}

export default OptimizedImage
