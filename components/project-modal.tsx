"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, TrendingUp } from "lucide-react"
import Image from "next/image"

export interface ProjectData {
  id: string
  title: string
  company: string
  description: string
  longDescription: string
  impact: string
  technologies: string[]
  metrics: string[]
  color: string
  icon: any
  images: string[]
  timeline: string
  teamSize?: string
  keyFeatures: string[]
  challenges?: string[]
  outcomes?: string[]
  demoUrl?: string
  category: string
}

interface ProjectModalProps {
  project: ProjectData | null
  isOpen: boolean
  onClose: () => void
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    if (isOpen && project) {
      setIsImageLoaded(false)
    }
  }, [isOpen, project])

  if (!project) return null

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 [&>button]:h-12 [&>button]:w-12 [&>button]:p-3 [&>button]:text-white [&>button]:bg-black/20 [&>button]:hover:bg-black/30 [&>button]:border-0 [&>button]:rounded-lg [&>button]:backdrop-blur-sm [&>button]:transition-colors [&>button>svg]:h-6 [&>button>svg]:w-6">
        <div className="relative">
          {/* Header with gradient background */}
          <div className={`bg-gradient-to-br ${project.color} p-6 text-white`}>
            <DialogHeader className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <project.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-2xl md:text-3xl font-bold text-white">
                    {project.title}
                  </DialogTitle>
                  <DialogDescription className="text-white/90 text-lg font-medium">
                    {project.company}
                  </DialogDescription>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 text-white/90">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{project.timeline}</span>
                </div>
                {project.teamSize && (
                  <div className="flex items-center gap-2 text-white/90">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{project.teamSize}</span>
                  </div>
                )}
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {project.category}
                </Badge>
              </div>
            </DialogHeader>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Images */}
            {project.images.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Project Screenshots</h3>
                <div className={`grid gap-4 ${project.images.length > 1 ? "md:grid-cols-2" : ""}`}>
                  {project.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative rounded-lg overflow-hidden border bg-muted/50"
                    >
                      <div
                        className={`relative aspect-video transition-opacity duration-500 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                      >
                        <Image
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          fill
                          className="object-cover"
                          onLoad={handleImageLoad}
                        />
                      </div>
                      {!isImageLoaded && (
                        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                          <div className="text-muted-foreground text-sm">Loading...</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Project Overview</h3>
              <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
            </div>

            {/* Impact & Metrics */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Business Impact</h3>
                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-700 dark:text-green-400">
                    {project.impact}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Key Metrics</h3>
                <div className="space-y-2">
                  {project.metrics.map((metric, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-muted-foreground">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Key Features</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges & Solutions */}
            {project.challenges && project.challenges.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Technical Challenges & Solutions</h3>
                <div className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <div
                      key={index}
                      className="p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                    >
                      <p className="text-sm">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Outcomes */}
            {project.outcomes && project.outcomes.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Project Outcomes</h3>
                <div className="space-y-3">
                  {project.outcomes.map((outcome, index) => (
                    <div
                      key={index}
                      className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20"
                    >
                      <p className="text-sm">{outcome}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
