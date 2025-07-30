import sharp from "sharp"
import fs from "fs"
import path from "path"

async function testBlurGeneration() {
  console.log("🔍 Testing blur data URL generation...\n")

  const galleryDir = path.join(process.cwd(), "public", "gallery")

  try {
    // Check if gallery directory exists
    if (!fs.existsSync(galleryDir)) {
      console.error("❌ Gallery directory not found:", galleryDir)
      return
    }

    const files = fs.readdirSync(galleryDir)
    const imageFiles = files.filter(
      (file) => /\.(jpg|jpeg|png|webp)$/i.test(file) && !file.startsWith(".")
    )

    if (imageFiles.length === 0) {
      console.log("⚠️ No image files found in gallery directory")
      return
    }

    console.log(`📸 Found ${imageFiles.length} images to test:\n`)

    for (const fileName of imageFiles.slice(0, 3)) {
      // Test first 3 images
      const imagePath = path.join(galleryDir, fileName)
      console.log(`Testing: ${fileName}`)

      try {
        // Generate original image info
        const metadata = await sharp(imagePath).metadata()
        console.log(`  Original: ${metadata.width}x${metadata.height} (${metadata.format})`)

        // Generate blur data URL
        const blurBuffer = await sharp(imagePath)
          .resize(8, 8, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .blur(1)
          .png()
          .toBuffer()

        const base64 = blurBuffer.toString("base64")
        const blurDataURL = `data:image/png;base64,${base64}`

        // Verify the base64 is valid
        if (blurDataURL.startsWith("data:image/png;base64,") && base64.length > 100) {
          console.log(
            `  ✅ Blur generated: ${Math.round((blurBuffer.length / 1024) * 100) / 100}KB`
          )
          console.log(`  📏 Base64 length: ${base64.length} chars`)

          // Save a test blur image to verify visually
          const testPath = path.join(process.cwd(), `test-blur-${fileName.split(".")[0]}.png`)
          fs.writeFileSync(testPath, blurBuffer)
          console.log(`  💾 Test blur saved: ${testPath}`)
        } else {
          console.log(`  ❌ Invalid blur data URL generated`)
        }
      } catch (error) {
        console.log(`  ❌ Error processing ${fileName}:`, error.message)
      }

      console.log("")
    }
  } catch (error) {
    console.error("❌ Error reading gallery directory:", error)
  }
}

async function testDataURLDecoding() {
  console.log("🧪 Testing data URL decoding...\n")

  // Test with a simple base64 image
  const testDataURL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=="

  try {
    const base64Data = testDataURL.split(",")[1]
    const buffer = Buffer.from(base64Data, "base64")

    console.log("✅ Data URL parsing successful")
    console.log(`📏 Buffer size: ${buffer.length} bytes`)

    // Verify it's a valid PNG
    const metadata = await sharp(buffer).metadata()
    console.log(`🖼️ Decoded image: ${metadata.width}x${metadata.height} (${metadata.format})`)
  } catch (error) {
    console.log("❌ Data URL decoding failed:", error.message)
  }
}

async function testRemoteImageFetch() {
  console.log("🌐 Testing remote image processing...\n")

  // Test with a small test image
  const testUrl = "https://via.placeholder.com/100x100.png"

  try {
    console.log(`Fetching: ${testUrl}`)

    const response = await fetch(testUrl)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer())
    console.log(`✅ Image fetched: ${Math.round((imageBuffer.length / 1024) * 100) / 100}KB`)

    // Generate blur
    const blurBuffer = await sharp(imageBuffer)
      .resize(8, 8, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .blur(1)
      .png()
      .toBuffer()

    const base64 = blurBuffer.toString("base64")
    const blurDataURL = `data:image/png;base64,${base64}`

    console.log(`✅ Remote blur generated: ${Math.round((blurBuffer.length / 1024) * 100) / 100}KB`)
    console.log(`📏 Base64 length: ${base64.length} chars`)
  } catch (error) {
    console.log("❌ Remote image processing failed:", error.message)
  }
}

// Function to test curl request simulation
async function testCurlLikeRequest() {
  console.log("🌐 Testing curl-like request to verify local server...\n")

  try {
    // Test if we can make a basic fetch request (simulating what a browser would do)
    console.log("Testing basic fetch capability...")

    const testResponse = await fetch("https://httpbin.org/json")
    if (testResponse.ok) {
      console.log("✅ Network requests working")
    }

    // In a real scenario, you'd test your local Next.js server:
    // const localResponse = await fetch('http://localhost:3000/api/test');
    console.log("💡 To test actual image loading, run your Next.js dev server and check:")
    console.log("   curl -I http://localhost:3000/gallery/your-image.jpg")
    console.log(
      '   curl -I "http://localhost:3000/_next/image?url=/gallery/your-image.jpg&w=640&q=75"'
    )
  } catch (error) {
    console.log("❌ Network test failed:", error.message)
  }
}

// Run all tests
async function runAllTests() {
  console.log("🚀 Starting Image Blur Generation Tests\n")
  console.log("=".repeat(50))

  await testBlurGeneration()
  console.log("=".repeat(50))

  await testDataURLDecoding()
  console.log("=".repeat(50))

  await testRemoteImageFetch()
  console.log("=".repeat(50))

  await testCurlLikeRequest()
  console.log("=".repeat(50))

  console.log("✨ All tests completed!")
  console.log("\n📋 Next steps:")
  console.log('1. Run "npm run dev" to start your Next.js server')
  console.log("2. Visit http://localhost:3000/gallery to see the optimized images")
  console.log("3. Check the Network tab in DevTools to verify blur placeholders load instantly")
  console.log("4. Use curl to test image endpoints:")
  console.log("   curl -I http://localhost:3000/gallery/your-image.jpg")
}

runAllTests().catch(console.error)
