"use client"

import { useEffect } from "react"

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const initAxe = async () => {
        const axe = await import("@axe-core/react")
        const React = await import("react")
        const ReactDOM = await import("react-dom")

        axe.default(React, ReactDOM, 1000)
      }

      initAxe()
    }
  }, [])

  return <>{children}</>
}
