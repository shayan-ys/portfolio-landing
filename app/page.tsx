import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { EducationSection } from "@/components/education-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"

export default function Portfolio() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main 
          id="main-content" 
          role="main" 
          aria-label="Main content"
          tabIndex={-1}
        >
          {/* Hidden heading for document structure */}
          <h1 className="sr-only">Shayan Yousefian - Portfolio</h1>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </main>
      </div>
    </>
  )
}
