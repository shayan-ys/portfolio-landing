"use client"

import { useState, useCallback, useMemo, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { MasonryPhotoAlbum } from "react-photo-album"
import "react-photo-album/masonry.css"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

// Import lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Slideshow from "yet-another-react-lightbox/plugins/slideshow"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/plugins/thumbnails.css"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Grid3X3, Clock, ArrowUpDown } from "lucide-react"
import type { GalleryImage } from "@/lib/image-utils"

interface GalleryClientProps {
  images: GalleryImage[]
}

type SortOrder = "newest" | "oldest"

const GalleryClient = ({ images }: GalleryClientProps) => {
  const [index, setIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest")
  const captionTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Sort images based on selected order
  const sortedImages = useMemo(() => {
    return [...images].sort((a, b) => {
      if (sortOrder === "newest") {
        return b.createdAt.getTime() - a.createdAt.getTime()
      } else {
        return a.createdAt.getTime() - b.createdAt.getTime()
      }
    })
  }, [images, sortOrder])

  // Convert gallery images to react-photo-album format
  const photoAlbumImages = useMemo(
    () =>
      sortedImages.map((image) => ({
        src: image.src,
        width: image.width,
        height: image.height,
        alt: image.alt,
        blurDataURL: image.blurDataURL,
        year: image.createdAt.getFullYear(),
      })),
    [sortedImages]
  )

  // Convert to lightbox slides format (maintain original order for lightbox)
  const lightboxSlides = useMemo(
    () =>
      sortedImages.map((image) => ({
        src: image.src,
        alt: image.alt,
        width: image.width,
        height: image.height,
      })),
    [sortedImages]
  )

  const handlePhotoClick = useCallback(({ index: photoIndex }: { index: number }) => {
    setIndex(photoIndex)
  }, [])

  const handleSortChange = useCallback((value: SortOrder) => {
    setSortOrder(value)
  }, [])

  // Add year captions after gallery renders using robust matching
  useEffect(() => {
    const addYearCaptions = () => {
      // First, remove any existing captions
      document.querySelectorAll(".year-caption").forEach((caption) => caption.remove())

      // Find all photo containers
      const photoElements = document.querySelectorAll(".react-photo-album--photo img")

      photoElements.forEach((img, index) => {
        const imgElement = img as HTMLImageElement
        const container = imgElement.closest(".react-photo-album--photo") as HTMLElement

        if (container && imgElement.src && sortedImages.length > 0) {
          let matchingImage = null

          // Strategy 1: Try matching by path ending (handles domain differences)
          if (!matchingImage) {
            const domPath = imgElement.src.split("/").slice(-2).join("/") // Get last 2 parts of path
            matchingImage = sortedImages.find((image) => image.src.endsWith(domPath))
          }

          // Strategy 2: Use alt attribute matching if available
          if (!matchingImage && imgElement.alt) {
            matchingImage = sortedImages.find((image) => image.alt === imgElement.alt)
          }

          // Get the year from matched image or use current year as fallback
          if (matchingImage) {
            const year = matchingImage.createdAt.getFullYear()

            // Create year caption element
            const caption = document.createElement("div")
            caption.className = "year-caption"
            caption.style.cssText =
              "position: absolute; bottom: 8px; right: 8px; background: rgba(0, 0, 0, 0.5); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; z-index: 10; backdrop-filter: blur(4px);"
            caption.textContent = year.toString()

            // Make container relative and add caption
            container.style.position = "relative"
            container.appendChild(caption)
          }
        }
      })
    }

    // Clear any existing timer
    if (captionTimerRef.current) {
      clearTimeout(captionTimerRef.current)
    }

    // Add captions after a delay to ensure gallery is rendered
    captionTimerRef.current = setTimeout(addYearCaptions, 500)

    // Handle window resize - re-add captions after masonry re-renders
    const handleResize = () => {
      // Clear existing timer and captions
      if (captionTimerRef.current) {
        clearTimeout(captionTimerRef.current)
      }
      document.querySelectorAll(".year-caption").forEach((caption) => caption.remove())

      // Re-add captions after masonry finishes re-rendering
      captionTimerRef.current = setTimeout(addYearCaptions, 300)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (captionTimerRef.current) {
        clearTimeout(captionTimerRef.current)
      }
      window.removeEventListener("resize", handleResize)
      // Clean up captions when component unmounts or dependencies change
      document.querySelectorAll(".year-caption").forEach((caption) => caption.remove())
    }
  }, [sortedImages, sortOrder]) // Re-run when images or sort order changes

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Portfolio</span>
                </Link>
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Grid3X3 className="h-4 w-4" />
                <span>{images.length} photos</span>
              </div>

              {/* Sort dropdown */}
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <Select value={sortOrder} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-32 h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gallery Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Photo Gallery
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            A visual journey through moments captured, experiences shared, and memories preserved.
            Each image tells a story of exploration, creativity, and the beauty found in everyday
            life.
          </p>
        </div>

        {/* Photo Album */}
        {images.length > 0 ? (
          <div className="relative">
            <MasonryPhotoAlbum
              photos={photoAlbumImages}
              columns={(containerWidth) => {
                if (containerWidth < 640) return 1
                if (containerWidth < 1024) return 2
                if (containerWidth < 1536) return 3
                return 4
              }}
              spacing={6}
              padding={0}
              onClick={handlePhotoClick}
            />
          </div>
        ) : (
          <div className="text-center py-16">
            <Grid3X3 className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No photos found</h3>
            <p className="text-muted-foreground">
              Photos will appear here once they are added to the gallery.
            </p>
          </div>
        )}
      </main>

      {/* Lightbox */}
      <Lightbox
        slides={lightboxSlides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        // Animation settings
        animation={{ fade: 300, swipe: 500 }}
        // Carousel settings optimized for touch
        carousel={{
          finite: false,
          preload: 2,
          padding: "16px",
          spacing: "30%",
          imageFit: "contain",
        }}
        // Zoom plugin settings
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        // Thumbnails plugin settings
        thumbnails={{
          position: "bottom",
          width: 120,
          height: 80,
          border: 2,
          borderRadius: 4,
          padding: 4,
          gap: 16,
          imageFit: "cover",
          vignette: true,
        }}
        // Slideshow plugin settings
        slideshow={{
          autoplay: false,
          delay: 3000,
        }}
        // Controller settings for touch interactions
        controller={{
          closeOnPullDown: true,
          closeOnBackdropClick: true,
          preventDefaultWheelX: true,
          preventDefaultWheelY: true,
        }}
        // Render settings
        render={{
          buttonPrev: images.length <= 1 ? () => null : undefined,
          buttonNext: images.length <= 1 ? () => null : undefined,
        }}
        // Styles for mobile optimization
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(8px)",
          },
          slide: {
            padding: "8px",
          },
        }}
        // Touch gestures
        on={{
          view: ({ index: slideIndex }) => {
            // Optional: Track view analytics
            console.log(`Viewing image ${slideIndex + 1} of ${images.length}`)
          },
        }}
      />
    </div>
  )
}

export default GalleryClient
