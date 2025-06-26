"use client"

import { useState, useEffect } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light")
    } else if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("system")
    }
  }

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-[1.2rem] w-[1.2rem]" />
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem]" />
      default:
        return <Monitor className="h-[1.2rem] w-[1.2rem]" />
    }
  }

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Light mode"
      case "dark":
        return "Dark mode"
      default:
        return "System mode"
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={cycleTheme} title={getLabel()}>
      {getIcon()}
      <span className="sr-only">{getLabel()}</span>
    </Button>
  )
}
