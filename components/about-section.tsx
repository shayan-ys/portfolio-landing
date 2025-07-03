"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Users, Rocket, Award } from "lucide-react"

const highlights = [
  {
    icon: Brain,
    title: "AI/ML Systems Development",
    description:
      "Built enterprise RAG systems and LLM integration platforms using LangChain and FastAPI",
  },
  {
    icon: Users,
    title: "Engineering Team Leadership",
    description:
      "Led remote engineering teams and mentored developers, resulting in promotions and growth",
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    description: "Delivered 500K+ daily visits and cut infrastructure costs by $400K+ annually",
  },
  {
    icon: Award,
    title: "Full-Stack Excellence",
    description:
      "Architected scalable web solutions serving 35M+ monthly users with high availability",
  },
]

export const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              About Me
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span>Driving Scalable Solutions Through </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Innovation
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <span className="font-bold">10+ years of software engineering experience</span>{" "}
              specializing in{" "}
              <span className="text-blue-600 font-bold">
                AI/ML systems and high-scale web applications
              </span>
              . I've <span className="font-bold">built systems serving 35M+ monthly users</span>,
              led engineering teams through critical product launches, and{" "}
              <span className="font-bold">reduced infrastructure costs by $400K+ annually</span>{" "}
              through strategic technical decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {highlights.map((highlight, index) => (
              <Card
                key={index}
                className="group md:hover:shadow-lg md:transition-all md:duration-300 md:hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center md:group-hover:scale-110 md:transition-transform md:duration-300">
                    <highlight.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">My Philosophy</h3>
                <p className="text-muted-foreground mb-4">
                  I believe in the power of technology to solve real-world problems. Every line of
                  code I write is driven by the desire to create meaningful impact, whether it's
                  optimizing performance, enhancing user experience, or pioneering new AI
                  capabilities.
                </p>
                <p className="text-muted-foreground">
                  My approach combines technical excellence with strategic thinking, ensuring that
                  solutions are not just functional, but scalable, maintainable, and aligned with
                  business objectives.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl mb-6 ring-4 ring-white/10 dark:ring-gray-800/50">
                  <Image
                    src="/profile_low.jpg"
                    alt="Shayan Yousefian - Senior Software Engineer"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 160px, 192px"
                  />
                </div>
                <div className="space-y-4 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm">10+ Years of Software Engineering Excellence</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-sm">35M+ Monthly Visits Delivered</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">$400K+ Annual Cost Savings Achieved</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-sm">Team Leadership & Mentorship Excellence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
