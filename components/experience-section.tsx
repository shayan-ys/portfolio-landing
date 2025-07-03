"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, TrendingUp } from "lucide-react"

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "Sway AI",
    location: "Remote",
    period: "Spring 2024 – Present",
    type: "Current Role",
    achievements: [
      "Engineered intuitive prompt studio tools enabling dynamic prompt generation and fine-tuning for internal and customer-facing LLM applications",
      "Led technical design and documentation of pivot table widget features, coordinating front-end, back-end, and microservices implementation",
      "Developed and optimized Retrieval-Augmented Generation (RAG) systems, integrating LLaMA models via LangChain and FastAPI",
      "Implemented advanced PySpark analytics workflows, including quantile analysis and winsorization techniques for large datasets",
      "Designed and deployed MongoDB aggregation pipelines with complex data bucketing and pivot operations",
    ],
    technologies: ["Python", "LangChain", "FastAPI", "PySpark", "MongoDB", "LLaMA", "RAG Systems"],
  },
  {
    title: "Lead Software Engineer",
    company: "OANDA Corporation",
    location: "Toronto, Canada",
    period: "Spring 2020 – Winter 2024",
    type: "Leadership Role",
    achievements: [
      "Managed remote engineering team of 6, delivering scalable web solutions generating 35M monthly visits",
      "Led redevelopment of currency converter web app, achieving 500K daily visits through React, Flask microservices, and GKE",
      "Enhanced productivity by deploying six React data-visualization applications, cutting annual IT costs by $400K",
      "Cultivated team growth through mentoring, resulting in promotions and higher team satisfaction",
    ],
    technologies: [
      "React",
      "Flask",
      "GKE",
      "Microservices",
      "Data Visualization",
      "Team Leadership",
    ],
  },
  {
    title: "Software Engineer",
    company: "HostPapa",
    location: "Burlington, Canada",
    period: "Spring 2018 – Spring 2020",
    type: "Full-Stack Development",
    achievements: [
      "Integrated AliPay into Ubersmith billing system to facilitate company acquisition with 1500 active customers",
      "Implemented PayPal's recurring billing agreement, encouraging 15% increase in customer service renewals",
    ],
    technologies: ["Payment Integration", "Billing Systems", "AliPay", "PayPal", "Ubersmith"],
  },
  {
    title: "Sr Full-Stack Software Engineer",
    company: "Yektanet",
    location: "Tehran, Iran",
    period: "Spring 2016 – Spring 2018",
    type: "Platform Development",
    achievements: [
      "Co-created Iran's largest online ad platform with highly-available, load-balancing front-end architecture",
      "Developed comprehensive suite of Python Django applications including big-data analytics and 3 specialized dashboards",
      "Improved blog website's page load speed by 45% through specialized WordPress plugins and optimization techniques",
      "Responsible for system requirements gathering, design, and development of 2 full-stack web applications",
    ],
    technologies: [
      "Python",
      "Django",
      "WordPress",
      "Big Data Analytics",
      "Load Balancing",
      "Performance Optimization",
    ],
  },
  {
    title: "Software Engineer",
    company: "Bamilo",
    location: "Tehran, Iran",
    period: "Summer 2015 – Spring 2016",
    type: "Data Engineering",
    achievements: [
      "Automated 5 data streams to centralize business data by querying 2 databases and crawling 3 dashboards",
      "Created Laravel application for visualizing e-commerce analytics data and scheduling data stream jobs",
    ],
    technologies: ["Laravel", "Data Automation", "E-commerce Analytics", "Database Management"],
  },
  {
    title: "Jr Full-Stack Software Engineer",
    company: "Pordo",
    location: "Tehran, Iran",
    period: "Winter 2013 – Summer 2015",
    type: "Early Career",
    achievements: [
      "Customized 20+ CodeIgniter (PHP) CMS instances, including front-end and dashboard components",
      "Tailored solutions to meet diverse customer requirements and business needs",
    ],
    technologies: ["PHP", "CodeIgniter", "CMS Development", "Custom Solutions"],
  },
]

export const ExperienceSection = () => {
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
    <section id="experience" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Professional Journey
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span>A Decade of </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Innovation
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From junior developer to senior engineer and team leader, my career has been defined
              by continuous learning, technical excellence, and delivering impactful solutions.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-background shadow-lg z-10 hidden md:block"></div>

                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                    <Card className="group md:hover:shadow-xl md:transition-all md:duration-300 md:hover:-translate-y-1">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <Badge
                            variant={exp.type === "Current Role" ? "default" : "secondary"}
                            className="w-fit"
                          >
                            {exp.type}
                          </Badge>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                          </div>
                        </div>
                        <CardTitle className="text-xl md:group-hover:text-blue-600 md:transition-colors">
                          {exp.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <TrendingUp className="h-4 w-4" />
                          <span className="font-medium">{exp.company}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {exp.location}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 mb-4">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
