"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, BookOpen, Award, Brain } from "lucide-react"

export const EducationSection = () => {
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
    <section id="education" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Education & Research
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span>Academic </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Combining advanced academic research with practical industry experience to drive innovation in artificial
              intelligence and software engineering.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="group md:hover:shadow-xl md:transition-all md:duration-300 md:hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center md:group-hover:scale-110 md:transition-transform md:duration-300">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl md:group-hover:text-blue-600 md:transition-colors">
                      Master of Science in Computer Science
                    </CardTitle>
                    <p className="text-lg text-muted-foreground">Brock University, St. Catharines, ON</p>
                    <p className="text-sm text-muted-foreground">Fall 2017 – Winter 2019</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Brain className="h-5 w-5 text-purple-500" />
                      <h3 className="text-lg font-semibold">Research Focus</h3>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-4">
                      <h4 className="font-medium mb-2">
                        Thesis: AI-Generated Quests for RPG Games Using Genetic Programming
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Pioneered the application of genetic programming algorithms to automatically generate engaging
                        and balanced quests for role-playing games, combining artificial intelligence with game design
                        principles.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Artificial Intelligence</Badge>
                      <Badge variant="outline">Genetic Programming</Badge>
                      <Badge variant="outline">Game Development</Badge>
                      <Badge variant="outline">Algorithm Design</Badge>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="h-5 w-5 text-blue-500" />
                      <h3 className="text-lg font-semibold">Academic Impact</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium">Advanced AI Research</p>
                          <p className="text-xs text-muted-foreground">
                            Explored cutting-edge applications of genetic algorithms in creative domains
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium">Interdisciplinary Approach</p>
                          <p className="text-xs text-muted-foreground">
                            Combined computer science with game design and user experience
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium">Innovation Foundation</p>
                          <p className="text-xs text-muted-foreground">
                            Established expertise in AI that drives current LLM and RAG work
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <Card className="text-center group md:hover:shadow-lg md:transition-all md:duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center md:group-hover:scale-110 md:transition-transform md:duration-300">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Research Excellence</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced thesis research in AI and genetic programming
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center group md:hover:shadow-lg md:transition-all md:duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center md:group-hover:scale-110 md:transition-transform md:duration-300">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">AI Specialization</h3>
                  <p className="text-sm text-muted-foreground">
                    Deep focus on artificial intelligence and machine learning
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center group md:hover:shadow-lg md:transition-all md:duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center md:group-hover:scale-110 md:transition-transform md:duration-300">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Academic Rigor</h3>
                  <p className="text-sm text-muted-foreground">
                    Strong foundation in computer science theory and practice
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
