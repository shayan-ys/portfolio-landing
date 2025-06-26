"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Linkedin, Github, MapPin, Phone, Send, Calendar } from "lucide-react"

export const ContactSection = () => {
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

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "info@shayanys.com",
      href: "mailto:info@shayanys.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "(647) 863-1891",
      href: "tel:+16478631891",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect with me",
      href: "https://www.linkedin.com/in/shayanys/",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "View my code",
      href: "https://github.com/shayan-ys",
      color: "from-gray-700 to-gray-900",
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Get In Touch
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Build <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Scalable Solutions</span> Together
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Looking for a <span className="font-bold">senior engineering leader</span> who can architect AI systems, scale teams, and deliver measurable business impact? Let's discuss how my experience building systems for 35M+ users can drive your next breakthrough.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Contact Information */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <Card
                      key={index}
                      className="group md:hover:shadow-lg md:transition-all md:duration-300 md:hover:-translate-y-1"
                    >
                      <CardContent className="p-4">
                        <a
                          href={method.href}
                          className="flex items-center gap-4 text-decoration-none"
                          target={method.href.startsWith("http") ? "_blank" : undefined}
                          rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center md:group-hover:scale-110 md:transition-transform md:duration-300`}
                          >
                            <method.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium md:group-hover:text-blue-600 md:transition-colors">
                              {method.label}
                            </p>
                            <p className="text-sm text-muted-foreground">{method.value}</p>
                          </div>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <h4 className="font-semibold">Location</h4>
                  </div>
                  <p className="text-muted-foreground mb-2">Toronto, Canada</p>
                  <p className="text-sm text-muted-foreground">
                    Available for remote work globally and on-site opportunities in the Greater Toronto Area.
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Ready to Connect?</h3>
                <div className="space-y-6">
                  <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <Send className="h-6 w-6" />
                      <h4 className="text-xl font-semibold">Let's Chat</h4>
                    </div>
                    <p className="mb-4 opacity-90">
                      The fastest way to reach me is via email. I typically respond within 24 hours.
                    </p>
                    <a
                      href="mailto:info@shayanys.com"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-white bg-transparent text-white hover:bg-white/10 hover:text-white h-11 px-8 w-full"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Let's Chat
                    </a>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="h-6 w-6 text-blue-500" />
                      <h4 className="text-xl font-semibold">Book a Call</h4>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Prefer to discuss over a call? Let's schedule a time that works for both of us.
                    </p>
                    <a
                      href="https://cal.com/shayanys/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Now
                    </a>
                  </Card>

                  <div className="text-center p-6 bg-muted/50 rounded-xl">
                    <h4 className="font-semibold mb-2">Open to Opportunities</h4>
                    <p className="text-sm text-muted-foreground">
                      Senior/Lead Software Engineer • AI/ML Architecture • Engineering Management • Technical Advisory
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-8 border-t">
              <p className="text-muted-foreground">
                © 2025 Shayan Yousefian. Crafted with passion for innovation and excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
