import type { Metadata } from "next"
import GalleryClient from "./gallery-client"
import { getGalleryImages } from "@/lib/image-utils"

export const metadata: Metadata = {
  title: "Gallery - Shayan Yousefian | Photography Portfolio",
  description:
    "Explore my personal photography collection featuring moments, travels, and creative captures. A visual journey through my lens showcasing artistic perspective and memorable experiences.",
  keywords: [
    "Shayan Yousefian photography",
    "personal gallery",
    "photography portfolio",
    "visual storytelling",
    "travel photography",
    "creative photography",
    "photo collection",
    "artistic captures",
  ],
  openGraph: {
    title: "Gallery - Shayan Yousefian | Photography Portfolio",
    description:
      "Explore my personal photography collection featuring moments, travels, and creative captures through my lens.",
    images: [
      {
        url: "/gallery/IMG_1639-EFFECTS.jpg",
        width: 1200,
        height: 630,
        alt: "Shayan Yousefian Photography Gallery",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery - Shayan Yousefian | Photography Portfolio",
    description: "Explore my personal photography collection and visual storytelling.",
    images: ["/gallery/IMG_1639-EFFECTS.jpg"],
  },
}

export default async function GalleryPage() {
  const images = await getGalleryImages()

  return <GalleryClient images={images} />
}
