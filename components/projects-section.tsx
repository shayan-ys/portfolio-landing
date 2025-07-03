"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Users, TrendingUp, Zap, Brain, Globe } from "lucide-react"
import { ProjectModal, type ProjectData } from "./project-modal"

const projects: ProjectData[] = [
  {
    id: "sway-ai",
    icon: Brain,
    title: "AI Prompt Studio Platform",
    company: "Sway AI",
    description:
      "Engineered comprehensive prompt studio tools enabling dynamic prompt generation and fine-tuning for LLM applications. Integrated RAG systems with LLaMA models via LangChain and FastAPI.",
    longDescription:
      "Led the development of an innovative AI-powered document intelligence platform that revolutionizes how businesses process contracts, invoices, and other critical documents. The platform combines advanced prompt engineering tools with robust RAG (Retrieval-Augmented Generation) systems to deliver unprecedented accuracy and speed in document processing workflows.",
    impact: "Revolutionized AI application development workflow",
    technologies: ["LangChain", "FastAPI", "LLaMA", "RAG Systems", "Python", "React", "TypeScript"],
    metrics: ["Dynamic Prompt Generation", "LLM Integration", "RAG Optimization"],
    color: "from-purple-500 to-pink-500",
    images: ["/projects/sway-ai-document-intelligence.webp"],
    timeline: "Spring 2024 - Present",
    teamSize: "6+ engineers",
    keyFeatures: [
      "Dynamic prompt generation and fine-tuning capabilities",
      "Integrated LLaMA models via LangChain framework",
      "Advanced RAG system for enhanced document understanding",
      "Real-time document processing with high accuracy",
      "Scalable microservices architecture",
      "Intuitive user interface for prompt studio tools"
    ],
    challenges: [
      "Optimizing prompt generation for diverse document types and use cases",
      "Implementing efficient RAG systems that balance accuracy with performance",
      "Designing scalable architecture to handle enterprise-level document volumes"
    ],
    outcomes: [
      "Achieved 95% accuracy in document classification and extraction",
      "Reduced document processing time by 80% compared to manual methods",
      "Successfully deployed to production serving multiple enterprise clients"
    ],
    demoUrl: "https://sway-ai.com",
    category: "AI & Machine Learning"
  },
  {
    id: "oanda-currency-converter",
    icon: Globe,
    title: "Currency Converter Web App",
    company: "OANDA Corporation",
    description:
      "Led complete redevelopment of high-traffic currency converter using React, Flask microservices, and Google Kubernetes Engine. Achieved exceptional performance and scalability.",
    longDescription:
      "Spearheaded the complete architectural redesign and redevelopment of OANDA's flagship currency converter application. This mission-critical application serves over 500,000 daily users and handles 35 million monthly visits across the platform. The project involved migrating from legacy systems to a modern, cloud-native architecture built on React, Flask microservices, and Google Kubernetes Engine.",
    impact: "500K daily visits, 35M monthly visits across platform",
    technologies: ["React", "Flask", "GKE", "Microservices", "Python", "TypeScript", "Docker"],
    metrics: ["500K Daily Visits", "35M Monthly Visits", "High Availability"],
    color: "from-blue-500 to-cyan-500",
    images: ["/projects/oanda-currency-converter.png"],
    timeline: "Spring 2020 - Winter 2024",
    teamSize: "6 engineers",
    keyFeatures: [
      "Real-time currency conversion with live exchange rates",
      "Support for all major world currencies",
      "Responsive design optimized for mobile and desktop",
      "High-performance caching layer for sub-second response times",
      "Microservices architecture for scalability",
      "Advanced analytics and monitoring"
    ],
    challenges: [
      "Handling massive traffic loads with 99.9% uptime requirements",
      "Implementing real-time data synchronization across multiple services",
      "Optimizing performance for sub-second response times under heavy load"
    ],
    outcomes: [
      "Achieved 99.9% uptime with zero data loss during migration",
      "Improved page load speeds by 60% compared to legacy system",
      "Successfully scaled to handle traffic spikes during market volatility"
    ],
    demoUrl: "https://oanda.com/currency/converter",
    category: "Web Application"
  },
  {
    id: "oanda-data-visualization",
    icon: TrendingUp,
    title: "Data Visualization Suite",
    company: "OANDA Corporation",
    description:
      "Developed and deployed six React-based data visualization applications for internal use, significantly improving operational efficiency and reducing infrastructure costs.",
    longDescription:
      "Created a comprehensive suite of internal data visualization tools that transformed how OANDA's teams analyze and interact with complex financial data. These applications provide real-time insights into trading patterns, market trends, and operational metrics, enabling data-driven decision making across the organization.",
    impact: "$400K annual cost savings through internal tooling",
    technologies: ["React", "D3.js", "Chart.js", "Python", "Data Visualization", "Internal Tools"],
    metrics: ["$400K Cost Savings", "6 Applications", "Team Productivity"],
    color: "from-green-500 to-emerald-500",
    images: ["/projects/oanda-data-vis.png"],
    timeline: "Spring 2021 - Winter 2023",
    teamSize: "4 engineers",
    keyFeatures: [
      "Interactive real-time dashboards for financial data",
      "Advanced charting capabilities with D3.js",
      "Custom data filtering and aggregation tools",
      "Automated report generation and scheduling",
      "Role-based access control for sensitive data",
      "Export capabilities for presentations and analysis"
    ],
    challenges: [
      "Processing and visualizing large volumes of real-time financial data",
      "Creating intuitive interfaces for complex analytical workflows",
      "Ensuring data security and compliance with financial regulations"
    ],
    outcomes: [
      "Eliminated need for expensive third-party analytics tools",
      "Improved decision-making speed by 40% through better data access",
      "Enhanced data accuracy and reduced manual reporting errors by 85%"
    ],
    category: "Data Analytics"
  },
  {
    id: "yektanet-ad-platform",
    icon: Zap,
    title: "Iran's Largest Ad Platform",
    company: "Yektanet",
    description:
      "Co-created highly-available, load-balancing advertising platform with comprehensive Python Django suite including big-data analytics and specialized dashboards for different user types.",
    longDescription:
      "Co-architected and developed Iran's most successful online advertising platform from the ground up. This comprehensive platform includes sophisticated load balancing, real-time bidding capabilities, advanced analytics, and multiple specialized dashboards tailored for advertisers, publishers, and platform administrators.",
    impact: "Became Iran's largest online advertising platform",
    technologies: ["Python", "Django", "Big Data", "Load Balancing", "Analytics", "PostgreSQL"],
    metrics: ["Largest Platform", "High Availability", "Multi-Dashboard"],
    color: "from-orange-500 to-red-500",
    images: ["/projects/yektanet-dashbard.png"],
    timeline: "Spring 2016 - Spring 2018",
    teamSize: "8+ engineers",
    keyFeatures: [
      "Real-time bidding and auction system",
      "Advanced targeting and segmentation capabilities",
      "Comprehensive analytics and reporting suite",
      "Multi-tenant dashboard architecture",
      "Automated campaign optimization",
      "Fraud detection and prevention systems"
    ],
    challenges: [
      "Building a scalable platform to handle millions of ad requests per day",
      "Implementing real-time bidding with sub-millisecond response times",
      "Creating robust fraud detection to maintain platform integrity"
    ],
    outcomes: [
      "Captured 60% market share in Iran's digital advertising space",
      "Processed over 10 million ad requests daily at peak",
      "Generated significant revenue growth for both advertisers and publishers"
    ],
    demoUrl: "https://yektanet.com",
    category: "AdTech Platform"
  },
  {
    id: "hostpapa-payments",
    icon: Users,
    title: "Payment Integration Systems",
    company: "HostPapa",
    description:
      "Successfully integrated AliPay and PayPal recurring billing systems into existing infrastructure, facilitating major business acquisitions and improving customer retention.",
    longDescription:
      "Led the strategic integration of multiple payment systems including AliPay and PayPal recurring billing into HostPapa's existing Ubersmith infrastructure. This initiative was crucial for expanding into Asian markets and improving the overall customer payment experience, directly contributing to successful business acquisitions.",
    impact: "Enabled acquisition of 1500+ customers, 15% renewal increase",
    technologies: ["Payment Integration", "AliPay", "PayPal", "Billing Systems", "PHP", "MySQL"],
    metrics: ["1500+ Customers", "15% Renewal Increase", "Business Growth"],
    color: "from-indigo-500 to-purple-500",
    images: ["/projects/hostpapa-alipay.png", "/projects/hostpapa-paypal.png"],
    timeline: "Spring 2018 - Spring 2020",
    teamSize: "3 engineers",
    keyFeatures: [
      "Seamless AliPay integration for Asian market expansion",
      "PayPal recurring billing for subscription management",
      "Multi-currency support and conversion",
      "Automated billing reconciliation",
      "Fraud detection and chargeback prevention",
      "Customer self-service payment portal"
    ],
    challenges: [
      "Integrating with legacy Ubersmith billing system without disruption",
      "Ensuring PCI compliance across multiple payment processors",
      "Handling currency conversion and international payment regulations"
    ],
    outcomes: [
      "Successfully acquired 1,500-customer company through AliPay integration",
      "Increased service renewal rates by 15% through improved payment UX",
      "Expanded market reach into Asian territories with localized payment options"
    ],
    category: "Payment Systems"
  },
  {
    id: "chetor-performance",
    icon: TrendingUp,
    title: "Performance Optimization Suite",
    company: "Chetor",
    description:
      "Developed specialized WordPress plugins and themes using advanced optimization techniques including lazy-loading and responsive images to dramatically improve site performance.",
    longDescription:
      "Created a comprehensive performance optimization suite for WordPress websites, focusing on dramatically improving page load speeds and user experience. The project involved developing custom plugins and themes with advanced techniques including intelligent lazy-loading, responsive image optimization, and efficient caching strategies.",
    impact: "45% improvement in page load speed",
    technologies: ["WordPress", "Performance Optimization", "Lazy Loading", "Responsive Design", "PHP"],
    metrics: ["45% Speed Improvement", "Custom Plugins", "User Experience"],
    color: "from-teal-500 to-blue-500",
    images: ["/projects/chetor.png"],
    timeline: "Winter 2016 - Summer 2017",
    teamSize: "2 engineers",
    keyFeatures: [
      "Advanced lazy-loading implementation for images and content",
      "Responsive image optimization with multiple breakpoints",
      "Custom WordPress plugins for performance enhancement",
      "Intelligent caching strategies for dynamic content",
      "CSS and JavaScript minification and bundling",
      "Database query optimization for faster page loads"
    ],
    challenges: [
      "Optimizing performance while maintaining WordPress compatibility",
      "Implementing lazy-loading without affecting SEO rankings",
      "Balancing image quality with loading speed across devices"
    ],
    outcomes: [
      "Achieved 45% improvement in average page load times",
      "Improved Core Web Vitals scores across all optimized sites",
      "Enhanced user engagement with reduced bounce rates"
    ],
    demoUrl: "https://chetor.com",
    category: "Performance Optimization"
  },
]

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
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A showcase of high-impact projects that demonstrate technical excellence, innovation,
                and measurable business results across various industries and technologies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
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

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-auto md:group-hover:bg-blue-50 dark:md:group-hover:bg-blue-950"
                      onClick={() => handleViewDetails(project)}
                    >
                      View Details
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  These projects represent just a fraction of what's possible when technical expertise
                  meets creative problem-solving. Let's discuss how we can create impactful solutions
                  together.
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

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
