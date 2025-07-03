import { NextResponse } from "next/server"
import path from "path"
import { readFile } from "fs/promises"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "resume.pdf")
    const fileBuffer = await readFile(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="Shayan_Yousefian_Resume.pdf"',
      },
    })
  } catch (error) {
    return new NextResponse("Resume not found", { status: 404 })
  }
}
