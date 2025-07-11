"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  ExternalLink,
  Search,
  Filter,
  TrendingUp,
  Calendar,
  Users,
  Code,
  Brain,
  Globe,
  Calculator,
  GraduationCap,
  Route,
  Mic,
  CheckSquare,
  Instagram,
  Zap,
  Gamepad2,
  Cpu,
  ListTodo,
  UserMinus,
} from "lucide-react"
import { ProjectModal, type ProjectData } from "@/components/project-modal"
import { ThemeToggle } from "@/components/theme-toggle"
import { projects, categories } from "@/lib/projects-data"

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All Projects")
  const [searchQuery, setSearchQuery] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
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

  // Trigger re-animation when filters change
  useEffect(() => {
    setIsVisible(false)
    setAnimationKey((prev) => prev + 1)
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [selectedCategory, searchQuery])

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All Projects" || project.category === selectedCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  const handleViewDetails = (project: ProjectData) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <button
                className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1 transition-colors duration-200 hover:opacity-80"
                onClick={() => {
                  setSelectedCategory("All Projects")
                  setSearchQuery("")
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    setSelectedCategory("All Projects")
                    setSearchQuery("")
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                }}
                aria-label="Go to top of page and reset filters"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                  <Image
                    src="/logo-smaller-white.png"
                    alt="Shayan Yousefian Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain rounded-md block dark:hidden"
                  />
                  <Image
                    src="/logo-smaller.png"
                    alt="Shayan Yousefian Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain rounded-md hidden dark:block"
                  />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Projects
                </span>
              </button>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-full px-4 py-2 mb-6">
                <Code className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Portfolio Showcase</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                A comprehensive showcase of innovative solutions spanning AI, web development, data
                analytics, and enterprise applications that have driven measurable business impact.
              </p>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{projects.length} Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{categories.length - 1} Categories</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Enterprise Scale</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Search */}
              <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:flex-shrink-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects, technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 w-full justify-center lg:justify-end lg:flex-1">
                <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <Tabs
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  className="w-full max-w-4xl"
                >
                  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto p-1">
                    {categories.slice(0, 6).map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="text-xs px-2 py-2 min-h-[36px] flex items-center justify-center whitespace-nowrap"
                      >
                        {category === "All Projects"
                          ? "All"
                          : category === "AI/ML"
                            ? "AI/ML"
                            : category === "Web Application"
                              ? "Web"
                              : category === "Voice Assistant"
                                ? "Voice"
                                : category === "Enterprise"
                                  ? "Enterprise"
                                  : category === "Data Analytics"
                                    ? "Data"
                                    : category.split(" ")[0]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section ref={sectionRef} className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" key={animationKey}>
              {filteredProjects.map((project, index) => (
                <Card
                  key={project.id}
                  className={`group md:hover:shadow-2xl md:transition-all md:duration-500 md:hover:-translate-y-3 h-full overflow-hidden ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Project Image */}
                  {project.images.length > 0 && (
                    <div className="relative h-48 overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`}
                      />
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover md:group-hover:scale-105 md:transition-transform md:duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90 text-black">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center md:group-hover:scale-110 md:transition-transform md:duration-300`}
                      >
                        <project.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg md:group-hover:text-blue-600 md:transition-colors line-clamp-2">
                          {project.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground font-medium">
                          {project.company}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-col h-full pt-0">
                    <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">
                      {project.description}
                    </p>

                    {/* Impact */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400 line-clamp-1">
                          {project.impact}
                        </span>
                      </div>
                    </div>

                    {/* Timeline & Team */}
                    <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span className="line-clamp-1">{project.timeline}</span>
                      </div>
                      {project.teamSize && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span className="line-clamp-1">{project.teamSize}</span>
                        </div>
                      )}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
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

            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Build Something Extraordinary?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                These projects represent the intersection of technical excellence and business
                impact. Let's collaborate to create solutions that drive real results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 md:hover:from-blue-700 md:hover:to-purple-700 text-white"
                  >
                    Get In Touch
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" size="lg">
                    View Full Portfolio
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
