"use client"

import { useEffect } from "react"

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const initAxe = async () => {
        try {
          const axe = await import("@axe-core/react")
          const React = await import("react")
          const ReactDOM = await import("react-dom")

          // Check if axe is already initialized to avoid double initialization
          if (typeof window !== "undefined" && !(window as any).__axeInitialized) {
            axe.default(React, ReactDOM, 1000)
            ;(window as any).__axeInitialized = true
          }
        } catch (error) {
          console.warn("Failed to initialize axe-core for accessibility testing:", error)
        }
      }

      initAxe()
    }
  }, [])

  return <>{children}</>
}
