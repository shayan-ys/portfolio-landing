import type React from "react"
import type { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL('https://shayanys.com'),
  title: "Shayan Yousefian - Senior Software Engineer & AI Innovator",
  description: "Transforming complex challenges into elegant solutions with cutting-edge AI, full-stack development, and team leadership expertise. Currently architecting the future of AI-powered applications.",
  keywords: [
    "Shayan Yousefian",
    "Software Engineer",
    "AI Developer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Toronto",
    "Sway AI"
  ],
  authors: [{ name: "Shayan Yousefian", url: "https://shayanys.com" }],
  creator: "Shayan Yousefian",
  icons: {
    icon: [
      {
        url: "/logo-smallest.png",
        sizes: "56x56",
        type: "image/png",
      },
      {
        url: "/logo-smaller.png", 
        sizes: "96x96",
        type: "image/png",
      }
    ],
    shortcut: "/logo.ico",
    apple: [
      {
        url: "/logo-smaller.png",
        sizes: "96x96",
        type: "image/png",
      }
    ]
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shayanys.com",
    title: "Shayan Yousefian - Senior Software Engineer & AI Innovator",
    description: "Transforming complex challenges into elegant solutions with cutting-edge AI, full-stack development, and team leadership expertise.",
    siteName: "Shayan Yousefian Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 553,
        height: 553,
        alt: "Shayan Yousefian - Senior Software Engineer & AI Innovator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shayan Yousefian - Senior Software Engineer & AI Innovator",
    description: "Transforming complex challenges into elegant solutions with cutting-edge AI, full-stack development, and team leadership expertise.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div id="root">
            {children}
          </div>
        </ThemeProvider>
        <SpeedInsights />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Defensive measure against inappropriate aria-hidden attributes
              (function() {
                const observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && 
                        (mutation.attributeName === 'aria-hidden' || mutation.attributeName === 'data-aria-hidden')) {
                      const target = mutation.target;
                      const mainContent = document.getElementById('main-content');
                      
                      // Remove aria-hidden if it's applied to elements containing main content
                      if (mainContent && target.contains(mainContent)) {
                        if (target.hasAttribute('aria-hidden')) {
                          target.removeAttribute('aria-hidden');
                        }
                        if (target.hasAttribute('data-aria-hidden')) {
                          target.removeAttribute('data-aria-hidden');
                        }
                      }
                      
                      // Specifically protect the root element and body
                      if (target.id === 'root' || target === document.body || target === document.documentElement) {
                        if (target.hasAttribute('aria-hidden')) {
                          target.removeAttribute('aria-hidden');
                        }
                        if (target.hasAttribute('data-aria-hidden')) {
                          target.removeAttribute('data-aria-hidden');
                        }
                      }
                    }
                  });
                });
                
                // Function to ensure main element is properly configured
                function ensureMainLandmark() {
                  const mainContent = document.getElementById('main-content');
                  if (mainContent) {
                    // Ensure main element has proper attributes
                    if (!mainContent.getAttribute('role')) {
                      mainContent.setAttribute('role', 'main');
                    }
                    if (!mainContent.getAttribute('aria-label')) {
                      mainContent.setAttribute('aria-label', 'Main content');
                    }
                    // Remove any inappropriate aria-hidden attributes
                    if (mainContent.hasAttribute('aria-hidden')) {
                      mainContent.removeAttribute('aria-hidden');
                    }
                    if (mainContent.hasAttribute('data-aria-hidden')) {
                      mainContent.removeAttribute('data-aria-hidden');
                    }
                  }
                }
                
                // Start observing once DOM is ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    ensureMainLandmark();
                    observer.observe(document.body, {
                      attributes: true,
                      attributeFilter: ['aria-hidden', 'data-aria-hidden'],
                      subtree: true
                    });
                  });
                } else {
                  ensureMainLandmark();
                  observer.observe(document.body, {
                    attributes: true,
                    attributeFilter: ['aria-hidden', 'data-aria-hidden'],
                    subtree: true
                  });
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
