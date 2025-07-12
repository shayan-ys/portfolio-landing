import type { Metadata } from "next"
import FunPlannerClient from "./funplanner-client"

export const metadata: Metadata = {
  title: "Fun Planner - React Native Mobile App | Shayan Yousefian",
  description:
    "Fun Planner is a comprehensive React Native mobile application that helps you plan and organize fun activities throughout the year. Features seasonal activity planning, smart filtering, and cross-platform compatibility.",
  keywords: [
    "Fun Planner",
    "React Native app",
    "mobile development",
    "activity planning",
    "seasonal activities",
    "iOS app",
    "Android app",
    "cross-platform development",
    "Shayan Yousefian",
    "mobile app portfolio",
  ],
  openGraph: {
    title: "Fun Planner - React Native Mobile App | Shayan Yousefian",
    description:
      "A comprehensive React Native mobile application that helps you plan and organize fun activities throughout the year. Never wonder what to do tonight again!",
    images: [
      {
        url: "/projects/funplanner-screenshots/IMG_1041.PNG",
        width: 1200,
        height: 630,
        alt: "Fun Planner Mobile App Screenshot - Activity Planning Interface",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fun Planner - React Native Mobile App | Shayan Yousefian",
    description:
      "A comprehensive React Native mobile application for planning and organizing fun activities throughout the year.",
    images: ["/projects/funplanner-screenshots/IMG_1041.PNG"],
  },
}

export default function FunPlannerPage() {
  return <FunPlannerClient />
}
