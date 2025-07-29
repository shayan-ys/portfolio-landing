import exifr from "exifr"
import { readdir } from "fs/promises"
import { join } from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function checkMissingExifDates() {
  const galleryDir = join(__dirname, "..", "public", "gallery")

  try {
    const files = await readdir(galleryDir)
    const imageFiles = files.filter(
      (file) => /\.(jpg|jpeg|png|webp)$/i.test(file) && !file.startsWith(".")
    )

    console.log(`Checking ${imageFiles.length} images for EXIF dates...\n`)

    const missingDates = []

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
          // Check if date is in filename
          const dateMatch = fileName.match(/(\d{4}-\d{2}-\d{2})/)
          if (dateMatch) {
            console.log(`✅ ${fileName} - No EXIF date but has date in filename: ${dateMatch[1]}`)
          } else {
            console.log(`❌ ${fileName} - Missing EXIF date and no date in filename`)
            missingDates.push(fileName)
          }
        } else {
          const dateFound =
            exifData?.DateTimeOriginal ||
            exifData?.CreateDate ||
            exifData?.DateTimeDigitized ||
            exifData?.DateTime
          console.log(`✅ ${fileName} - Has EXIF date: ${dateFound}`)
        }
      } catch (error) {
        console.log(`❌ ${fileName} - Error reading EXIF: ${error.message}`)
        missingDates.push(fileName)
      }
    }

    console.log(`\n📊 Summary:`)
    console.log(`Total images: ${imageFiles.length}`)
    console.log(`Images with dates: ${imageFiles.length - missingDates.length}`)
    console.log(`Images missing dates: ${missingDates.length}`)

    if (missingDates.length > 0) {
      console.log(`\n🔧 Images that need manual date setting:`)
      missingDates.forEach((file) => console.log(`   - ${file}`))
    }

    return missingDates
  } catch (error) {
    console.error("Error checking EXIF dates:", error)
    return []
  }
}

checkMissingExifDates()
