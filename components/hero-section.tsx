"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react"

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleScrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleScrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      action()
    }
  }

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center transition-all duration-1000 pt-20 sm:pt-8 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Profile Image */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/10 dark:ring-gray-800/50">
            <Image
              src="/profile.jpg"
              alt="Shayan Yousefian - Senior Software Engineer & AI Innovator"
              width={128}
              height={128}
              priority
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 96px, 128px"
            />
          </div>

          <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Shayan Yousefian
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6 font-light">
            Senior Software Engineer & AI Innovator
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Transforming complex challenges into elegant solutions with cutting-edge AI, full-stack development, and
            team leadership expertise. Currently architecting the future of AI-powered applications at Sway AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>Toronto, Canada</span>
            </div>
            <div className="flex items-center gap-4" role="list" aria-label="Social links">
              <Button variant="outline" size="icon" asChild>
                <a 
                  href="mailto:info@shayanys.com" 
                  aria-label="Send email to Shayan Yousefian"
                  role="listitem"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://www.linkedin.com/in/shayanys/"
                  aria-label="Visit Shayan Yousefian's LinkedIn profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a 
                  href="https://github.com/shayan-ys" 
                  aria-label="Visit Shayan Yousefian's GitHub profile" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  role="listitem"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleScrollToAbout}
              onKeyDown={(e) => handleKeyDown(e, handleScrollToAbout)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              aria-label="Scroll to about section"
            >
              Explore My Work
              <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleScrollToContact}
              onKeyDown={(e) => handleKeyDown(e, handleScrollToContact)}
              aria-label="Scroll to contact section"
            >
              Get In Touch
            </Button>
          </div>

          {/* Floating Animation */}
          <div className="flex justify-center mt-12 animate-bounce" aria-hidden="true">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  )
}
