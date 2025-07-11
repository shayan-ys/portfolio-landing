import type { Metadata } from "next"
import ResumeClient from "./resume-client"

export const metadata: Metadata = {
  title: "Resume - Shayan Yousefian | Senior Software Engineer & AI Innovator",
  description:
    "Download Shayan Yousefian's professional resume featuring expertise in AI/ML, full-stack development, team leadership, and enterprise software solutions. Available in PDF and Markdown formats.",
  keywords: [
    "Shayan Yousefian resume",
    "software engineer resume",
    "AI developer resume",
    "full-stack developer resume",
    "senior software engineer",
    "AI innovator",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "Toronto developer",
  ],
  openGraph: {
    title: "Resume - Shayan Yousefian | Senior Software Engineer & AI Innovator",
    description:
      "Download Shayan Yousefian's professional resume featuring expertise in AI/ML, full-stack development, team leadership, and enterprise software solutions.",
    images: [
      {
        url: "/profile.jpg",
        width: 553,
        height: 553,
        alt: "Shayan Yousefian - Senior Software Engineer & AI Innovator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume - Shayan Yousefian | Senior Software Engineer & AI Innovator",
    description:
      "Download Shayan Yousefian's professional resume featuring expertise in AI/ML, full-stack development, and team leadership.",
    images: ["/profile.jpg"],
  },
}

export default function ResumePage() {
  return <ResumeClient />
}
