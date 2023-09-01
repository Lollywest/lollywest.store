"use client"

import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ArtistTabsProps extends React.ComponentPropsWithoutRef<typeof Tabs> {
  artistId: number
}

export function ArtistTabs({ className, artistId, ...props }: ArtistTabsProps) {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    {
      title: "Store",
      href: `/dashboard/artist/`,
    },
    {
      title: "Products",
      href: `/dashboard/artist/products`,
    },
    // {
    //   title: "Orders",
    //   href: `/dashboard/artist/orders`,
    // },
    // {
    //   title: "Payments",
    //   href: `/dashboard/artist/payments`,
    // },
    // {
    //   title: "Analytics",
    //   href: `/dashboard/artist/analytics`,
    // },
  ]

  return (
    <Tabs
      {...props}
      className={cn("w-full overflow-x-auto", className)}
      onValueChange={(value) => router.push(value)}
    >
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.title}
            value={tab.href}
            className={cn(
              pathname === tab.href && "bg-background text-foreground shadow-sm"
            )}
            onClick={() => router.push(tab.href)}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
