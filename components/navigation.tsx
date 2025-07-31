"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navItems = [
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "/gallery", label: "Gallery", isExternal: true },
  { href: "#contact", label: "Contact" },
  { href: "resume", label: "Download Resume" },
]

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    // Check scroll position on mount
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string, isExternal?: boolean) => {
    setIsMobileMenuOpen(false)
    if (href === "resume") {
      const link = document.createElement("a")
      link.href = "/resume.pdf"
      link.download = "Shayan_Yousefian_Resume.pdf"
      link.click()
    } else if (isExternal) {
      window.location.href = href
    } else {
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleBannerClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleKeyDown = (event: React.KeyboardEvent, href: string, isExternal?: boolean) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleNavClick(href, isExternal)
    }
  }

  const handleBannerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleBannerClick()
    }
  }

  const handleSkipToMain = () => {
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Skip Navigation Link for Accessibility */}
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault()
          handleSkipToMain()
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-border focus:rounded-md"
      >
        Skip to main content
      </a>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <button
                onClick={handleBannerClick}
                onKeyDown={handleBannerKeyDown}
                className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1"
                aria-label="Go to top of page"
              >
                {/* Light mode logo */}
                <Image
                  src="/logo-smallest.png"
                  alt="Shayan Yousefian Logo"
                  width={40}
                  height={40}
                  className="rounded-full dark:hidden"
                  priority
                />
                {/* Dark mode logo */}
                <Image
                  src="/logo-smaller-white.png"
                  alt="Shayan Yousefian Logo"
                  width={40}
                  height={40}
                  className="rounded-full hidden dark:block"
                  priority
                />
                <span className="text-xl font-bold text-foreground hidden sm:block">
                  Shayan Yousefian
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <ul className="flex items-center space-x-8" role="list">
                {navItems
                  .filter((item) => item.href !== "resume")
                  .map((item) => (
                    <li key={item.href} role="listitem">
                      <button
                        onClick={() => handleNavClick(item.href, item.isExternal)}
                        onKeyDown={(e) => handleKeyDown(e, item.href, item.isExternal)}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
                        aria-label={`Navigate to ${item.label} ${item.isExternal ? "page" : "section"}`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
              </ul>
              <ThemeToggle />
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              id="mobile-menu"
              className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b shadow-lg"
              role="menu"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href, item.isExternal)}
                    onKeyDown={(e) => handleKeyDown(e, item.href, item.isExternal)}
                    className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-2 px-3 rounded-md hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    role="menuitem"
                    aria-label={`Navigate to ${item.label} ${item.isExternal ? "page" : "section"}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
