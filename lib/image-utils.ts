import exifr from "exifr"
import { readdir, stat } from "fs/promises"
import { join } from "path"
import sharp from "sharp"

export interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
  blurDataURL: string
  createdAt: Date
  fileName: string
}

export interface ImageDimensions {
  width: number
  height: number
}

// Get image dimensions using Next.js Image API or fallback to common ratios
export const getImageDimensions = async (imagePath: string): Promise<ImageDimensions> => {
  try {
    // Try to get EXIF data first for actual dimensions
    const exifData = await exifr.parse(imagePath, [
      "ImageWidth",
      "ImageHeight",
      "ExifImageWidth",
      "ExifImageHeight",
    ])

    if (exifData?.ImageWidth && exifData?.ImageHeight) {
      return {
        width: exifData.ImageWidth,
        height: exifData.ImageHeight,
      }
    }

    if (exifData?.ExifImageWidth && exifData?.ExifImageHeight) {
      return {
        width: exifData.ExifImageWidth,
        height: exifData.ExifImageHeight,
      }
    }
  } catch (error) {
    console.warn(`Could not read EXIF dimensions for ${imagePath}:`, error)
  }

  // Fallback to common aspect ratios based on file name patterns
  const fileName = imagePath.toLowerCase()
  if (fileName.includes("wide") || fileName.includes("panorama")) {
    return { width: 1920, height: 1080 } // 16:9 wide
  }
  if (fileName.includes("portrait") || fileName.includes("tall")) {
    return { width: 1080, height: 1920 } // 9:16 portrait
  }

  // Default to 4:3 aspect ratio
  return { width: 1600, height: 1200 }
}

// Extract creation date from EXIF data or file stats
export const getImageCreationDate = async (imagePath: string, fileName: string): Promise<Date> => {
  try {
    // First try to get from EXIF data
    const exifData = await exifr.parse(imagePath, [
      "DateTimeOriginal",
      "CreateDate",
      "DateTime",
      "DateTimeDigitized",
    ])

    // Priority order for date fields
    const dateFields = [
      exifData?.DateTimeOriginal,
      exifData?.CreateDate,
      exifData?.DateTimeDigitized,
      exifData?.DateTime,
    ]

    for (const dateField of dateFields) {
      if (dateField && dateField instanceof Date) {
        return dateField
      }
      if (dateField && typeof dateField === "string") {
        const parsedDate = new Date(dateField)
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate
        }
      }
    }
  } catch (error) {
    console.warn(`Could not read EXIF date for ${imagePath}:`, error)
  }

  // Check for date in filename (e.g., "2025-07-12")
  const dateMatch = fileName.match(/(\d{4}-\d{2}-\d{2})/)
  if (dateMatch) {
    const parsedDate = new Date(dateMatch[1])
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate
    }
  }

  // Fallback to file system creation date
  try {
    const stats = await stat(imagePath)
    return stats.birthtime || stats.mtime
  } catch (error) {
    console.warn(`Could not read file stats for ${imagePath}:`, error)
    return new Date() // Ultimate fallback to current date
  }
}

// Generate a blur placeholder data URL (simplified version)
export const generateBlurDataURL = (width: number, height: number): string => {
  // Create a simple SVG blur placeholder with a subtle gradient
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(230,230,230);stop-opacity:0.8" />
          <stop offset="50%" style="stop-color:rgb(240,240,240);stop-opacity:0.6" />
          <stop offset="100%" style="stop-color:rgb(220,220,220);stop-opacity:0.8" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`
}

// Note: Remote blur generation commented out since we're using local images only
// If needed for remote images, use a simple SVG placeholder instead of Sharp
// export const generateRemoteBlurDataURL = async (imageUrl: string): Promise<string> => {
//   return generateBlurDataURL(400, 300) // Use default dimensions for remote images
// }

// Get all gallery images with metadata and blur data URLs
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  const galleryDir = join(process.cwd(), "public", "gallery")

  try {
    const files = await readdir(galleryDir)
    const imageFiles = files.filter(
      (file) => /\.(jpg|jpeg|png|webp)$/i.test(file) && !file.startsWith(".")
    )

    const images: GalleryImage[] = []

    for (const fileName of imageFiles) {
      const imagePath = join(galleryDir, fileName)
      const publicPath = `/gallery/${fileName}`

      try {
        const [dimensions, createdAt] = await Promise.all([
          getImageDimensions(imagePath),
          getImageCreationDate(imagePath, fileName),
        ])

        const blurDataURL = generateBlurDataURL(dimensions.width, dimensions.height)

        images.push({
          src: publicPath,
          alt: `Gallery image ${fileName.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")}`,
          width: dimensions.width,
          height: dimensions.height,
          blurDataURL,
          createdAt,
          fileName,
        })
      } catch (error) {
        console.error(`Error processing image ${fileName}:`, error)
        // Still add the image with fallback data
        const fallbackBlurDataURL =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=="

        images.push({
          src: publicPath,
          alt: `Gallery image ${fileName}`,
          width: 1600,
          height: 1200,
          blurDataURL: fallbackBlurDataURL,
          createdAt: new Date(),
          fileName,
        })
      }
    }

    // Sort by creation date (newest first)
    return images.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  } catch (error) {
    console.error("Error reading gallery directory:", error)
    return []
  }
}

// Check which images are missing EXIF dates
export const checkMissingExifDates = async (): Promise<string[]> => {
  const galleryDir = join(process.cwd(), "public", "gallery")

  try {
    const files = await readdir(galleryDir)
    const imageFiles = files.filter(
      (file) => /\.(jpg|jpeg|png|webp)$/i.test(file) && !file.startsWith(".")
    )

    const missingDates: string[] = []

    for (const fileName of imageFiles) {
      const imagePath = join(galleryDir, fileName)

      try {
        const exifData = await exifr.parse(imagePath, [
          "DateTimeOriginal",
          "CreateDate",
          "DateTime",
          "DateTimeDigitized",
        ])

        const hasExifDate = !!(
          exifData?.DateTimeOriginal ||
          exifData?.CreateDate ||
          exifData?.DateTimeDigitized ||
          exifData?.DateTime
        )

        if (!hasExifDate) {
          missingDates.push(fileName)
        }
      } catch (error) {
        missingDates.push(fileName)
      }
    }

    return missingDates
  } catch (error) {
    console.error("Error checking EXIF dates:", error)
    return []
  }
}
