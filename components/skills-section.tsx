"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Code, Database, Cloud, Brain, Users, Wrench } from "lucide-react"

const skillCategories = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "LangChain", level: 90 },
      { name: "RAG Systems", level: 85 },
      { name: "LLaMA Models", level: 80 },
      { name: "FastAPI", level: 90 },
      { name: "PySpark", level: 85 },
    ],
  },
  {
    icon: Code,
    title: "Frontend Development",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React", level: 95 },
      { name: "NextJS", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "TailwindCSS", level: 85 },
      { name: "SASS", level: 80 },
    ],
  },
  {
    icon: Database,
    title: "Backend & Databases",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Python", level: 95 },
      { name: "Django", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 85 },
      { name: "Redis", level: 80 },
    ],
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "GCP", level: 85 },
      { name: "Kubernetes", level: 80 },
      { name: "Docker", level: 90 },
      { name: "Terraform", level: 75 },
      { name: "CircleCI", level: 80 },
    ],
  },
  {
    icon: Users,
    title: "Leadership & Management",
    color: "from-indigo-500 to-purple-500",
    skills: [
      { name: "Team Leadership", level: 90 },
      { name: "Mentoring", level: 85 },
      { name: "Project Management", level: 85 },
      { name: "Technical Architecture", level: 90 },
      { name: "Stakeholder Communication", level: 85 },
    ],
  },
  {
    icon: Wrench,
    title: "Tools & Technologies",
    color: "from-teal-500 to-blue-500",
    skills: [
      { name: "Helm Charts", level: 75 },
      { name: "ArgoCD", level: 70 },
      { name: "Cloudflare", level: 80 },
      { name: "TestCafe e2e", level: 75 },
      { name: "KinD", level: 70 },
    ],
  },
]

export const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedSkills, setAnimatedSkills] = useState<Record<string, number>>({})
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate skill bars
          setTimeout(() => {
            const skillsMap: Record<string, number> = {}
            skillCategories.forEach((category) => {
              category.skills.forEach((skill) => {
                skillsMap[skill.name] = skill.level
              })
            })
            setAnimatedSkills(skillsMap)
          }, 500)
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
    <section id="skills" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Technical Expertise
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Mastering the Tech Stack & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Architecture</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              <span className="font-bold">Senior-level expertise</span> in system architecture, team leadership, and AI/ML implementation. Proven ability to <span className="font-bold">design scalable systems</span>, mentor engineering teams, and drive technical decisions that impact millions of users and save hundreds of thousands in operational costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className="group md:hover:shadow-xl md:transition-all md:duration-300 md:hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center md:group-hover:scale-110 md:transition-transform md:duration-300`}
                    >
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress 
                          value={animatedSkills[skill.name] || 0} 
                          className="h-2" 
                          aria-label={`${skill.name} proficiency level: ${skill.level}%`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex flex-wrap gap-2 justify-center max-w-4xl">
              {[
                "Python",
                "React",
                "NextJS",
                "Django",
                "MongoDB",
                "GCP",
                "Kubernetes",
                "Docker",
                "LangChain",
                "PySpark",
                "PostgreSQL",
                "Redis",
                "TailwindCSS",
                "TypeScript",
                "FastAPI",
                "Terraform",
                "CircleCI",
                "ArgoCD",
                "Cloudflare",
              ].map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
