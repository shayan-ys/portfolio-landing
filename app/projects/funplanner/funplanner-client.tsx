"use client"

import {
  ArrowLeft,
  Calendar,
  Filter,
  Heart,
  Star,
  Smartphone,
  CheckCircle,
  Sun,
  Snowflake,
  Leaf,
  CloudRain,
  Github,
  Code,
  Users,
  Timer,
  Play,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"

export default function FunPlannerClient() {
  const features = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Activity Planning",
      description:
        "Create and organize fun activities throughout the year with detailed customization options.",
    },
    {
      icon: <Filter className="h-6 w-6" />,
      title: "Smart Filtering",
      description: "Filter activities by season, price range, and weekday/weekend preferences.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Seasonal Activities",
      description:
        "Organize activities by Winter, Spring, Summer, and Fall seasons for year-round planning.",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Cross-Platform",
      description:
        "Built with React Native for seamless performance on both iOS and Android devices.",
    },
  ]

  const seasons = [
    { name: "Winter", icon: <Snowflake className="h-5 w-5" />, color: "bg-blue-500" },
    { name: "Spring", icon: <Leaf className="h-5 w-5" />, color: "bg-green-500" },
    { name: "Summer", icon: <Sun className="h-5 w-5" />, color: "bg-yellow-500" },
    { name: "Fall", icon: <CloudRain className="h-5 w-5" />, color: "bg-orange-500" },
  ]

  const appBenefits = [
    "Never run out of fun activity ideas",
    "Seasonal activity recommendations",
    "Budget-friendly activity filtering",
    "Weekend and weekday activity planning",
    "Personal activity notes and customization",
    "Cross-platform mobile compatibility",
  ]

  const screenshots = [
    "/projects/funplanner-screenshots/IMG_1041.PNG",
    "/projects/funplanner-screenshots/IMG_1043.PNG",
    "/projects/funplanner-screenshots/IMG_1044.PNG",
    "/projects/funplanner-screenshots/IMG_1045.PNG",
    "/projects/funplanner-screenshots/IMG_1046.PNG",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/projects"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Back to Projects</span>
              </Link>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                  <Calendar className="w-full h-full text-white" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Fun Planner
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300"
              >
                Mobile App
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-white dark:from-purple-900/10 dark:via-pink-900/10 dark:to-background"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full px-4 py-2 mb-6">
                    <Smartphone className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      React Native App
                    </span>
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                    Fun Planner
                    <span className="text-purple-600 block">Mobile App</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    A comprehensive React Native mobile application that helps you plan and organize
                    fun activities throughout the year. Never wonder what to do tonight again!
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-purple-400 text-purple-400" />
                    <span>Personal Project</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>April 2020</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <Github className="h-5 w-5 mr-2" />
                    View on GitHub
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#screenshots">
                      <Play className="h-5 w-5 mr-2" />
                      View Screenshots
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative mx-auto max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
                  <div className="relative bg-card rounded-3xl p-4 shadow-2xl border">
                    <Image
                      src={screenshots[0]}
                      alt="FunPlanner App Screenshot"
                      width={300}
                      height={600}
                      className="rounded-2xl w-full"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Key Features</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Everything you need to plan and organize your fun activities with smart filtering
                and seasonal organization.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-purple-600">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots Gallery */}
        <section
          id="screenshots"
          className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-background dark:from-purple-900/5 dark:via-pink-900/5 dark:to-background"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">App Screenshots</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore the intuitive interface and comprehensive features of Fun Planner.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {screenshots.map((screenshot, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative bg-card rounded-2xl p-3 shadow-lg border group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={screenshot}
                      alt={`Fun Planner Screenshot ${index + 1}`}
                      width={200}
                      height={400}
                      className="rounded-xl w-full h-auto"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seasonal Activities Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Seasonal Activity Planning
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Organize your activities by seasons and never miss the perfect timing for your
                favorite activities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {seasons.map((season, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <CardHeader>
                    <div
                      className={`w-16 h-16 ${season.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}
                    >
                      {season.icon}
                    </div>
                    <CardTitle className="text-xl">{season.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Plan activities perfect for {season.name.toLowerCase()} season with
                      appropriate filtering and suggestions.
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* App Benefits */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Why Use Fun Planner?</h2>
                <p className="text-muted-foreground text-lg">
                  Fun Planner solves the common problem of forgetting great activity ideas and helps
                  you make the most of every season throughout the year.
                </p>
                <ul className="space-y-4">
                  {appBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="text-purple-800 dark:text-purple-200">
                      Perfect for...
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-muted-foreground">
                        People who love planning activities
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                        <Heart className="h-4 w-4 text-pink-600" />
                      </div>
                      <span className="text-muted-foreground">Families looking for fun ideas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-muted-foreground">
                        Anyone wanting to maximize their free time
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                Technical Implementation
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Technology Stack
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Framework</span>
                        <Badge variant="outline">React Native</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Navigation</span>
                        <Badge variant="outline">React Navigation</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">UI Components</span>
                        <Badge variant="outline">React Native Elements</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Platform</span>
                        <Badge variant="outline">iOS & Android</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Key Capabilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-muted-foreground">
                          Activity creation & management
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span className="text-muted-foreground">
                          Multi-criteria filtering system
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-muted-foreground">Seasonal categorization</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span className="text-muted-foreground">Cross-platform compatibility</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Explore the Code</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Fun Planner is open-source and available on GitHub. Explore the React Native
              implementation and see how modern mobile apps are built.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => window.open("https://github.com/shayan-ys/Fun-ToDo", "_blank")}
              >
                <Github className="h-5 w-5 mr-2" />
                View on GitHub
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
