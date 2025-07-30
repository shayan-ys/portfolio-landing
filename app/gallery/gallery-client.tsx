"use client"

import { useState, useCallback, useMemo, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
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
import { Label } from "@/components/ui/label"
import { ArrowLeft, Grid3X3, ArrowUpDown } from "lucide-react"
import OptimizedImage from "@/components/lazy-image"
import type { GalleryImage } from "@/lib/image-utils"

interface GalleryClientProps {
  images: GalleryImage[]
}

type SortOrder = "newest" | "oldest"

const GalleryClient = ({ images }: GalleryClientProps) => {
  const [index, setIndex] = useState(-1)
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest")
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [masonryColumns, setMasonryColumns] = useState<GalleryImage[][]>([])
  const [columnCount, setColumnCount] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

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

  // Calculate responsive column count
  const calculateColumnCount = useCallback(() => {
    if (!containerRef.current) return 1

    const containerWidth = containerRef.current.offsetWidth
    if (containerWidth >= 1280) return 4 // xl
    if (containerWidth >= 1024) return 3 // lg
    if (containerWidth >= 640) return 2 // sm
    return 1
  }, [])

  // Arrange images into masonry columns (maintains horizontal ordering)
  const arrangeMasonryColumns = useCallback((images: GalleryImage[], cols: number) => {
    if (cols <= 0) return []

    // Initialize columns
    const columns: GalleryImage[][] = Array(cols)
      .fill(null)
      .map(() => [])
    const columnHeights = Array(cols).fill(0)

    // Distribute images to shortest column (maintains order)
    images.forEach((image) => {
      // Find column with minimum height
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))

      // Add image to shortest column
      columns[shortestColumnIndex].push(image)

      // Update column height (approximate based on aspect ratio)
      const aspectRatio = image.width / image.height
      const estimatedHeight = 300 / aspectRatio // Base width of ~300px
      columnHeights[shortestColumnIndex] += estimatedHeight + 24 // Add gap
    })

    return columns
  }, [])

  // Update column count on resize
  useEffect(() => {
    const handleResize = () => {
      const newColumnCount = calculateColumnCount()
      if (newColumnCount !== columnCount) {
        setColumnCount(newColumnCount)
      }
    }

    handleResize() // Initial calculation
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [calculateColumnCount, columnCount])

  // Update masonry layout when images or column count changes
  useEffect(() => {
    const columns = arrangeMasonryColumns(sortedImages, columnCount)
    setMasonryColumns(columns)
  }, [sortedImages, columnCount, arrangeMasonryColumns])

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

  const handleImageLoad = useCallback((imageSrc: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageSrc))
  }, [])

  const handlePhotoClick = useCallback(
    (imageSrc: string) => {
      // Only allow lightbox if image is fully loaded
      if (loadedImages.has(imageSrc)) {
        // Find the index in sortedImages for lightbox
        const photoIndex = sortedImages.findIndex((img) => img.src === imageSrc)
        if (photoIndex !== -1) {
          setIndex(photoIndex)
        }
      }
    },
    [loadedImages, sortedImages]
  )

  const handleSortChange = useCallback((value: SortOrder) => {
    setSortOrder(value)
  }, [])

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
                  <span className="hidden sm:inline">Back to Portfolio</span>
                  <span className="sm:hidden">Home</span>
                </Link>
              </Button>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <button
                className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1 transition-colors duration-200 hover:opacity-80"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                }}
                aria-label="Go to top of gallery page"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                  <Image
                    src="/logo-smaller-white.png"
                    alt="Shayan Yousefian Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain rounded-md block dark:hidden"
                  />
                  <Image
                    src="/logo-smaller.png"
                    alt="Shayan Yousefian Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain rounded-md hidden dark:block"
                  />
                </div>
                <span className="hidden sm:inline font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Gallery
                </span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <Grid3X3 className="h-4 w-4" />
                <span>{images.length} photos</span>
              </div>

              {/* Sort dropdown */}
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="hidden sm:block h-4 w-4 text-muted-foreground" />
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

        {/* Photo Gallery */}
        {images.length > 0 ? (
          <div className="relative" ref={containerRef}>
            {/* JavaScript-based masonry grid (maintains horizontal ordering) */}
            <div className="flex gap-3 sm:gap-4 md:gap-6 items-start">
              {masonryColumns.map((column, columnIndex) => (
                <div key={columnIndex} className="flex-1 flex flex-col gap-3 sm:gap-4 md:gap-6">
                  {column.map((image) => {
                    const originalIndex = sortedImages.findIndex((img) => img.src === image.src)
                    return (
                      <div key={image.src} className="relative">
                        <OptimizedImage
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          blurDataURL={image.blurDataURL}
                          onLoad={() => handleImageLoad(image.src)}
                          onClick={() => handlePhotoClick(image.src)}
                          className="w-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                          priority={originalIndex < 6} // Prioritize first 6 images
                        />
                        {/* Year caption */}
                        <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                          {image.createdAt.getFullYear()}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
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
