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

// Get pre-generated blur data URL from build-time generated placeholders
export const generateBlurDataURL = async (imagePath: string): Promise<string> => {
  try {
    // Extract filename from path and create placeholder path
    const fileName = imagePath.split("/").pop() || ""
    const baseName = fileName.replace(/\.[^.]+$/, "") // Remove extension
    const placeholderFileName = `${baseName}.webp`
    const placeholderPath = join(
      process.cwd(),
      "public",
      "gallery",
      "placeholders",
      placeholderFileName
    )

    try {
      // Try to read the pre-generated placeholder file
      const placeholderBuffer = await sharp(placeholderPath).toBuffer()
      const base64 = placeholderBuffer.toString("base64")
      return `data:image/webp;base64,${base64}`
    } catch (placeholderError) {
      console.warn(
        `Could not find pre-generated placeholder for ${imagePath}, falling back to runtime generation:`,
        placeholderError
      )

      // Fallback to runtime generation if placeholder doesn't exist
      const imageBuffer = await sharp(imagePath)
        .resize(8, null, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 75 })
        .toBuffer()

      const base64 = imageBuffer.toString("base64")
      return `data:image/webp;base64,${base64}`
    }
  } catch (error) {
    console.warn(`Could not generate blur data URL for ${imagePath}:`, error)

    // Ultimate fallback to a simple gray placeholder
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=="
  }
}

// Generate blur data URL for remote images (still runtime since we can't pre-generate remote images)
export const generateRemoteBlurDataURL = async (imageUrl: string): Promise<string> => {
  try {
    // Fetch the remote image
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer())

    // Generate blur using Sharp with updated parameters to match build-time generation
    const blurBuffer = await sharp(imageBuffer)
      .resize(8, null, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 75 })
      .toBuffer()

    // Convert to base64 data URL
    const base64 = blurBuffer.toString("base64")
    return `data:image/webp;base64,${base64}`
  } catch (error) {
    console.warn(`Could not generate blur data URL for remote image ${imageUrl}:`, error)

    // Fallback to a simple gray placeholder
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=="
  }
}

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
        const [dimensions, createdAt, blurDataURL] = await Promise.all([
          getImageDimensions(imagePath),
          getImageCreationDate(imagePath, fileName),
          generateBlurDataURL(imagePath),
        ])

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
