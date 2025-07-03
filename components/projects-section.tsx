"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Users, TrendingUp, Zap, Brain, Globe } from "lucide-react"

const projects = [
  {
    icon: Brain,
    title: "AI Prompt Studio Platform",
    company: "Sway AI",
    description:
      "Engineered comprehensive prompt studio tools enabling dynamic prompt generation and fine-tuning for LLM applications. Integrated RAG systems with LLaMA models via LangChain and FastAPI.",
    impact: "Revolutionized AI application development workflow",
    technologies: ["LangChain", "FastAPI", "LLaMA", "RAG Systems", "Python"],
    metrics: ["Dynamic Prompt Generation", "LLM Integration", "RAG Optimization"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Globe,
    title: "Currency Converter Web App",
    company: "OANDA Corporation",
    description:
      "Led complete redevelopment of high-traffic currency converter using React, Flask microservices, and Google Kubernetes Engine. Achieved exceptional performance and scalability.",
    impact: "500K daily visits, 35M monthly visits across platform",
    technologies: ["React", "Flask", "GKE", "Microservices", "Python"],
    metrics: ["500K Daily Visits", "35M Monthly Visits", "High Availability"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Data Visualization Suite",
    company: "OANDA Corporation",
    description:
      "Developed and deployed six React-based data visualization applications for internal use, significantly improving operational efficiency and reducing infrastructure costs.",
    impact: "$400K annual cost savings through internal tooling",
    technologies: ["React", "Data Visualization", "Internal Tools", "Cost Optimization"],
    metrics: ["$400K Cost Savings", "6 Applications", "Team Productivity"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Zap,
    title: "Iran's Largest Ad Platform",
    company: "Yektanet",
    description:
      "Co-created highly-available, load-balancing advertising platform with comprehensive Python Django suite including big-data analytics and specialized dashboards for different user types.",
    impact: "Became Iran's largest online advertising platform",
    technologies: ["Python", "Django", "Big Data", "Load Balancing", "Analytics"],
    metrics: ["Largest Platform", "High Availability", "Multi-Dashboard"],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Users,
    title: "Payment Integration Systems",
    company: "HostPapa",
    description:
      "Successfully integrated AliPay and PayPal recurring billing systems into existing infrastructure, facilitating major business acquisitions and improving customer retention.",
    impact: "Enabled acquisition of 1500+ customers, 15% renewal increase",
    technologies: ["Payment Integration", "AliPay", "PayPal", "Billing Systems"],
    metrics: ["1500+ Customers", "15% Renewal Increase", "Business Growth"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Performance Optimization Suite",
    company: "Yektanet",
    description:
      "Developed specialized WordPress plugins and themes using advanced optimization techniques including lazy-loading and responsive images to dramatically improve site performance.",
    impact: "45% improvement in page load speed",
    technologies: ["WordPress", "Performance Optimization", "Lazy Loading", "Responsive Design"],
    metrics: ["45% Speed Improvement", "Custom Plugins", "User Experience"],
    color: "from-teal-500 to-blue-500",
  },
]

export const ProjectsSection = () => {
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
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Featured Projects
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span>Transforming Ideas Into </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Impact
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A showcase of high-impact projects that demonstrate technical excellence, innovation, and measurable
              business results across various industries and technologies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group md:hover:shadow-xl md:transition-all md:duration-300 md:hover:-translate-y-2 h-full"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center md:group-hover:scale-110 md:transition-transform md:duration-300`}
                    >
                      <project.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg md:group-hover:text-blue-600 md:transition-colors">
                        {project.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{project.company}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">{project.impact}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="grid grid-cols-1 gap-1">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                          {metric}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-auto md:group-hover:bg-blue-50 dark:md:group-hover:bg-blue-950"
                  >
                    View Details
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                These projects represent just a fraction of what's possible when technical expertise meets creative
                problem-solving. Let's discuss how we can create impactful solutions together.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 md:hover:from-blue-700 md:hover:to-purple-700 text-white"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Start a Conversation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
