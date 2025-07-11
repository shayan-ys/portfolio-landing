import type { Metadata } from "next"
import ProjectsClient from "./projects-client"

export const metadata: Metadata = {
  title: "Projects - Shayan Yousefian | Full-Stack & AI Development Portfolio",
  description:
    "Explore my comprehensive project portfolio featuring AI/ML applications, enterprise solutions, web development, and data analytics projects that have driven measurable business impact.",
  keywords: [
    "Shayan Yousefian projects",
    "AI projects",
    "full-stack development",
    "enterprise applications",
    "web development portfolio",
    "React projects",
    "Next.js applications",
    "machine learning projects",
    "data analytics",
    "software engineering portfolio",
  ],
  openGraph: {
    title: "Projects - Shayan Yousefian | Full-Stack & AI Development Portfolio",
    description:
      "Explore innovative solutions spanning AI, web development, data analytics, and enterprise applications that have driven measurable business impact.",
    images: [
      {
        url: "/projects/projects-collage.png",
        width: 1200,
        height: 630,
        alt: "Shayan Yousefian Projects - AI and Software Development Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Shayan Yousefian | Full-Stack & AI Development Portfolio",
    description:
      "Explore innovative solutions spanning AI, web development, data analytics, and enterprise applications.",
    images: ["/projects/projects-collage.png"],
  },
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
