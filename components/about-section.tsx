"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Users, Rocket, Award } from "lucide-react"

const highlights = [
  {
    icon: Brain,
    title: "AI & ML Pioneer",
    description: "Leading the development of cutting-edge LLM applications and RAG systems",
  },
  {
    icon: Users,
    title: "Team Leadership",
    description: "Successfully managed remote engineering teams delivering scalable solutions",
  },
  {
    icon: Rocket,
    title: "Performance Optimizer",
    description: "Achieved 500K daily visits and $400K annual cost savings through innovation",
  },
  {
    icon: Award,
    title: "Full-Stack Expertise",
    description: "10+ years of experience across the entire technology stack",
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
      { threshold: 0.1 },
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
              Crafting Digital Excellence Through
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Innovation
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              With over a decade of experience in software engineering, I specialize in building scalable,
              high-performance applications that drive business growth. My journey spans from full-stack development to
              AI innovation, always with a focus on delivering exceptional user experiences and technical excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {highlights.map((highlight, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                  I believe in the power of technology to solve real-world problems. Every line of code I write is
                  driven by the desire to create meaningful impact, whether it's optimizing performance, enhancing user
                  experience, or pioneering new AI capabilities.
                </p>
                <p className="text-muted-foreground">
                  My approach combines technical excellence with strategic thinking, ensuring that solutions are not
                  just functional, but scalable, maintainable, and aligned with business objectives.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm">10+ Years of Software Engineering Excellence</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span className="text-sm">35M+ Monthly Visits Delivered</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">$400K+ Annual Cost Savings Achieved</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-sm">Multiple Teams Successfully Led</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
