"use client"

import { Download, FileText, FileDown } from "lucide-react"

const ResumePage = () => {
  const handleDownload = (format: "pdf" | "md") => {
    if (format === "pdf") {
      const link = document.createElement("a")
      link.href = "/resume.pdf"
      link.download = "Shayan_Yousefian_Resume.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return
    }
    const link = document.createElement("a")
    link.href = "/resume.md"
    link.download = "Shayan_Yousefian_Resume.md"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={() => handleDownload("pdf")}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
          aria-label="Download resume as PDF"
        >
          <FileDown className="w-5 h-5" />
          <span>Download as PDF</span>
        </button>

        <button
          onClick={() => handleDownload("md")}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-white border border-neutral-900 text-neutral-900 hover:bg-neutral-100 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
          aria-label="Download resume as Markdown"
        >
          <FileText className="w-5 h-5" />
          <span>Download as Markdown</span>
        </button>
      </div>
    </div>
  )
}

export default ResumePage
