"use client"

import { useState, useCallback, useMemo } from "react"
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
import { ArrowLeft, Grid3X3, Clock } from "lucide-react"
import type { GalleryImage } from "@/lib/image-utils"

interface GalleryClientProps {
  images: GalleryImage[]
}

const GalleryClient = ({ images }: GalleryClientProps) => {
  const [index, setIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)

  // Convert gallery images to react-photo-album format
  const photoAlbumImages = useMemo(
    () =>
      images.map((image) => ({
        src: image.src,
        width: image.width,
        height: image.height,
        alt: image.alt,
        blurDataURL: image.blurDataURL,
      })),
    [images]
  )

  // Convert to lightbox slides format
  const lightboxSlides = useMemo(
    () =>
      images.map((image) => ({
        src: image.src,
        alt: image.alt,
        width: image.width,
        height: image.height,
      })),
    [images]
  )

  const handlePhotoClick = useCallback(({ index: photoIndex }: { index: number }) => {
    setIndex(photoIndex)
  }, [])

  // Custom image render function with progressive loading
  const renderPhoto = useCallback(
    ({ photo, imageProps: { alt, style, ...restImageProps } }: any) => {
      return (
        <div
          style={{
            ...style,
            position: "relative",
            overflow: "hidden",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          className="group hover:shadow-lg hover:shadow-black/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Image
            {...restImageProps}
            alt={alt}
            src={photo.src}
            placeholder="blur"
            blurDataURL={photo.blurDataURL}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
            priority={false}
            style={{
              ...style,
              objectFit: "cover",
              transition: "all 0.3s ease",
            }}
            className="group-hover:brightness-110"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )
    },
    []
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Newest first</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gallery Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Photo Gallery
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            A visual journey through moments captured, experiences shared, and memories preserved.
            Each image tells a story of exploration, creativity, and the beauty found in everyday
            life.
          </p>
        </div>

        {/* Photo Album */}
        {images.length > 0 ? (
          <MasonryPhotoAlbum
            photos={photoAlbumImages}
            columns={(containerWidth) => {
              if (containerWidth < 640) return 1
              if (containerWidth < 1024) return 2
              if (containerWidth < 1536) return 3
              return 4
            }}
            spacing={12}
            padding={0}
            onClick={handlePhotoClick}
          />
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
