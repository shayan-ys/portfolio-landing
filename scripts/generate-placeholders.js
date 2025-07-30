import sharp from "sharp"
import { promises as fs } from "fs"
import path from "path"

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery")
const PLACEHOLDER_DIR = path.join(GALLERY_DIR, "placeholders")
const PLACEHOLDER_WIDTH = 8
const PLACEHOLDER_QUALITY = 75

async function generatePlaceholders() {
  console.log("🖼️  Starting placeholder generation...")

  try {
    // Ensure placeholder directory exists
    await fs.mkdir(PLACEHOLDER_DIR, { recursive: true })

    // Get all image files
    const files = await fs.readdir(GALLERY_DIR)
    const imageFiles = files.filter(
      (file) =>
        /\.(jpg|jpeg|png|webp)$/i.test(file) && !file.startsWith(".") && file !== "placeholders" // Skip the placeholders directory
    )

    console.log(`📸 Found ${imageFiles.length} images to process`)

    let processed = 0
    let skipped = 0

    for (const fileName of imageFiles) {
      const inputPath = path.join(GALLERY_DIR, fileName)
      const baseName = path.parse(fileName).name
      const outputFileName = `${baseName}.webp`
      const outputPath = path.join(PLACEHOLDER_DIR, outputFileName)

      try {
        // Check if placeholder already exists and is newer than source
        try {
          const [sourceStats, placeholderStats] = await Promise.all([
            fs.stat(inputPath),
            fs.stat(outputPath),
          ])

          if (placeholderStats.mtime > sourceStats.mtime) {
            console.log(`⏭️  Skipping ${fileName} (placeholder is up to date)`)
            skipped++
            continue
          }
        } catch {
          // Placeholder doesn't exist, continue with generation
        }

        // Generate placeholder
        const info = await sharp(inputPath)
          .resize(PLACEHOLDER_WIDTH, null, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({
            quality: PLACEHOLDER_QUALITY,
            effort: 6, // Higher effort for better compression
          })
          .toFile(outputPath)

        console.log(
          `✅ Generated ${outputFileName} (${info.width}x${info.height}, ${Math.round((info.size / 1024) * 100) / 100}KB)`
        )
        processed++
      } catch (error) {
        console.error(`❌ Error processing ${fileName}:`, error.message)
      }
    }

    console.log(`\n🎉 Placeholder generation complete!`)
    console.log(`   📈 Processed: ${processed}`)
    console.log(`   ⏭️  Skipped: ${skipped}`)
    console.log(`   📁 Output directory: ${PLACEHOLDER_DIR}`)
  } catch (error) {
    console.error("💥 Fatal error during placeholder generation:", error)
    process.exit(1)
  }
}

// Add cleanup function to remove orphaned placeholder files
async function cleanupOrphanedPlaceholders() {
  try {
    const galleryFiles = await fs.readdir(GALLERY_DIR)
    const imageFiles = new Set(
      galleryFiles
        .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file) && !file.startsWith("."))
        .map((file) => path.parse(file).name)
    )

    const placeholderFiles = await fs.readdir(PLACEHOLDER_DIR)
    let cleaned = 0

    for (const placeholderFile of placeholderFiles) {
      const baseName = path.parse(placeholderFile).name
      if (!imageFiles.has(baseName)) {
        const placeholderPath = path.join(PLACEHOLDER_DIR, placeholderFile)
        await fs.unlink(placeholderPath)
        console.log(`🗑️  Removed orphaned placeholder: ${placeholderFile}`)
        cleaned++
      }
    }

    if (cleaned > 0) {
      console.log(`🧹 Cleaned up ${cleaned} orphaned placeholder files`)
    }
  } catch (error) {
    console.warn("⚠️  Warning: Could not cleanup orphaned placeholders:", error.message)
  }
}

// Run the script
generatePlaceholders()
  .then(() => cleanupOrphanedPlaceholders())
  .catch((error) => {
    console.error("Script failed:", error)
    process.exit(1)
  })

export { generatePlaceholders }
