"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, MapPin, Download } from "lucide-react"

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 200) // Slight delay to ensure proper rendering

    return () => clearTimeout(timer)
  }, [])

  const handleScrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleScrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Shayan_Yousefian_Resume.pdf'
    link.click()
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
      <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] text-gray-900 dark:text-white dark:invert-[1] dark:opacity-80" />
      
      {/* Shooting Stars Animation */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Horizontal shooting stars - positioned on grid lines (40px multiples) */}
        <div className="shooting-star-h shooting-star-blue" style={{ top: '80px', animationDelay: '0s' }} />
        <div className="shooting-star-h shooting-star-purple" style={{ top: '240px', animationDelay: '2s' }} />
        <div className="shooting-star-h shooting-star-teal" style={{ top: '400px', animationDelay: '4s' }} />
        <div className="shooting-star-h shooting-star-indigo" style={{ top: '560px', animationDelay: '6s' }} />
        
        {/* Vertical shooting stars - positioned on grid lines (40px multiples) */}
        <div className="shooting-star-v shooting-star-emerald" style={{ left: '160px', animationDelay: '1s' }} />
        <div className="shooting-star-v shooting-star-rose" style={{ left: '320px', animationDelay: '3s' }} />
        <div className="shooting-star-v shooting-star-amber" style={{ left: '480px', animationDelay: '5s' }} />
        <div className="shooting-star-v shooting-star-cyan" style={{ left: '640px', animationDelay: '7s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center pt-20">
          {/* Profile Image */}
          <div 
            className={`w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/10 dark:ring-gray-800/50 hero-profile delay-100 ${
              isLoaded ? "show" : ""
            }`}
          >
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

          {/* Main Heading */}
          <h1 
            id="hero-heading" 
            className={`text-5xl md:text-7xl font-bold mb-6 hero-animate delay-200 ${
              isLoaded ? "show" : ""
            }`}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Shayan Yousefian
            </span>
          </h1>

          {/* Subtitle */}
          <h2 
            className={`text-2xl md:text-3xl text-muted-foreground mb-6 font-light hero-animate delay-300 ${
              isLoaded ? "show" : ""
            }`}
          >
            Senior Software Engineer & AI Leader
          </h2>

          {/* Description */}
          <p 
            className={`text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed hero-animate delay-400 ${
              isLoaded ? "show" : ""
            }`}
          >
            <span className="font-bold">Senior Software Engineer</span> with expertise in <span className="text-blue-600 font-bold">AI/ML and scalable web applications serving 35M+ monthly users</span>. <span className="font-bold">Led engineering teams</span> through strategic decisions and process optimization, delivering <span className="text-blue-600 font-bold">$400K+ in annual cost savings</span>.
          </p>

          {/* Location and Social Links - Restored to original inline layout */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 hero-animate delay-500 ${
              isLoaded ? "show" : ""
            }`}
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>Toronto, Canada</span>
            </div>
            <div className="flex items-center gap-4" role="list" aria-label="Social links">
              <Button 
                variant="outline" 
                size="icon" 
                asChild 
                className={`hero-social delay-600 hero-button ${
                  isLoaded ? "show" : ""
                }`}
              >
                <a 
                  href="mailto:info@shayanys.com" 
                  aria-label="Send email to Shayan Yousefian"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                asChild 
                className={`hero-social delay-700 hero-button ${
                  isLoaded ? "show" : ""
                }`}
              >
                <a
                  href="https://www.linkedin.com/in/shayanys/"
                  aria-label="Visit Shayan Yousefian's LinkedIn profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                asChild 
                className={`hero-social delay-800 hero-button ${
                  isLoaded ? "show" : ""
                }`}
              >
                <a 
                  href="https://github.com/shayan-ys" 
                  aria-label="Visit Shayan Yousefian's GitHub profile" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center hero-animate delay-600 ${
              isLoaded ? "show" : ""
            }`}
          >
            <Button
              size="lg"
              onClick={handleScrollToAbout}
              onKeyDown={(e) => handleKeyDown(e, handleScrollToAbout)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hero-button"
            >
              Explore My Work
              <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleDownloadResume}
              onKeyDown={(e) => handleKeyDown(e, handleDownloadResume)}
              className="hero-button relative bg-gradient-to-r from-blue-600 to-purple-600 p-[2px] rounded-md hover:from-blue-700 hover:to-purple-700"
            >
              <span className="flex items-center bg-background dark:bg-background rounded-[4px] px-4 py-2 text-foreground hover:bg-blue-50 dark:hover:bg-gray-800/50 transition-colors">
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                Download Resume
              </span>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleScrollToContact}
              onKeyDown={(e) => handleKeyDown(e, handleScrollToContact)}
              className="hero-button"
            >
              Get In Touch
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div 
            className={`flex justify-center mt-12 hero-animate delay-700 ${
              isLoaded ? "show" : ""
            }`} 
            aria-hidden="true"
          >
            <ArrowDown className="h-6 w-6 text-muted-foreground hero-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
