import type { Metadata } from "next"
import { env } from "@/env.mjs"
import { ClerkProvider } from "@clerk/nextjs"
import { AxiomWebVitals } from 'next-axiom';
import { Analytics } from '@vercel/analytics/react';

import "@/styles/globals.css"

import { siteConfig } from "@/config/site"
import { fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/providers"
import { TailwindIndicator } from "@/components/tailwind-indicator"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Server Actions",
    "Lollywest",
    "Skateboard",
    "Skateboarding",
    "Kickflip",
  ],
  authors: [
    {
      name: "Lollywest",
    },
  ],
  creator: "lollywest",
  themeColor: [
    //{ media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
  },
  icons: {
    icon: "/favicon.ico",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <head />
          <AxiomWebVitals />
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable,
              fontMono.variable
            )}
          >
            <Providers attribute="class" defaultTheme="system" enableSystem>
              {children}
              <TailwindIndicator />
            </Providers>
            <Analytics />
            <Toaster />
          </body>
        </html>
      </ClerkProvider>
    </>
  )
}
