"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, TrendingUp, ArrowRight, Terminal, Layers } from "lucide-react"
import { ProjectModal, type ProjectData } from "./project-modal"
import { featuredProjects, projects } from "@/lib/projects-data"

export const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  const handleViewDetails = (project: ProjectData) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300) // Delay to allow modal close animation
  }

  return (
    <>
      <section id="projects" ref={sectionRef} className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Header */}
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
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                A showcase of high-impact projects that demonstrate technical excellence,
                innovation, and measurable business results across various industries and
                technologies.
              </p>

              {/* Subtle project stats */}
              <div className="space-y-4 md:space-y-0 md:flex md:justify-center md:items-center md:gap-8 text-center">
                <div className="flex items-center justify-center gap-3 md:gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">6 Featured</span>
                </div>
                <div className="flex items-center justify-center gap-3 md:gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">
                    {projects.length} Total Projects
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3 md:gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Live Demos</span>
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredProjects.map((project, index) => (
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
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          {project.impact}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="grid grid-cols-1 gap-1">
                        {project.metrics.map((metric, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                            {metric}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 md:group-hover:bg-blue-50 dark:md:group-hover:bg-blue-950"
                        onClick={() => handleViewDetails(project)}
                      >
                        View Details
                      </Button>
                      {project.demoUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="px-3"
                          onClick={() => window.open(project.demoUrl, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Integrated CTA - More subtle and cohesive */}
            <div className="text-center">
              <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl border border-dashed border-muted-foreground/20 bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Terminal className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold mb-1">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        More Projects
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground">Explore the complete portfolio</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link href="/projects">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 md:hover:from-blue-700 md:hover:to-purple-700 text-white shadow-md md:hover:shadow-lg transition-all duration-300 px-6 py-2 font-medium group">
                      <span>View All Projects</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-3 w-3" />
                      <span>{projects.length} Projects</span>
                    </div>
                    <div className="w-1 h-1 bg-muted-foreground/30 rounded-full"></div>
                    <span>Live Demos Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Section - Collaboration focused */}
            <div className="mt-20 text-center">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  These projects represent just a fraction of what's possible when technical
                  expertise meets creative problem-solving. Let's discuss how we can create
                  impactful solutions together.
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

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
