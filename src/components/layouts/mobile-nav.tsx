"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { MainNavItem, SidebarNavItem } from "@/types"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"



interface MobileNavProps {
  mainNavItems?: MainNavItem[]
  sidebarNavItems: SidebarNavItem[]
}

export function MobileNav({ mainNavItems }: MobileNavProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Icons.menu className="" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7">
          <Link
            aria-label="Home"
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Icons.logo className="mr-2 h-4 w-4" aria-hidden="true" />
            {/* <span className="font-bold">{siteConfig.name}</span> */}
          </Link>
        </div>

        

        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <Accordion type="single" collapsible className="w-full">
              {mainNavItems?.slice(0,1).map((item, index) => (
                <AccordionItem value={item.title} key={index}>
                  <AccordionTrigger className="text-sm capitalize">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">


                      


                      {item.items?.map((subItem, index) =>
                        subItem.href ? (
                          <MobileLink
                            key={index}
                            href={String(subItem.href)}
                            pathname={pathname}
                            setIsOpen={setIsOpen}
                            disabled={subItem.disabled}
                          >
                            {subItem.title}
                          </MobileLink>
                        ) : (
                          <div
                            key={index}
                            className="text-foreground/70 transition-colors"
                          >
                            {item.title}
                          </div>
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}

              
            </Accordion>
              <div  className = " grid gap-6">
                  <div className = " pt-8">
                    <Link
                          aria-label="Featured"
                          href="/featured"
                          className="text-sm leading-tight text-muted-foreground"
                        >
                          Featured
                      </Link>
                  </div>

                  <div>
                      <Link
                              aria-label="Leaderboard"
                              href="/leaderboard"
                              // className="hidden items-center space-x-2 lg:flex"
                              className="text-sm leading-tight text-muted-foreground"
                            >
                              Leaderboard
                              {/* <span className="hidden font-bold lg:inline-block">
                                Top Artists & Fans
                              </span> */}
                              
                      </Link>
                  </div>

                  <div>
                    <Link
                        aria-label="Sponsor Artists"
                        href="/sponsor-artists"
                        // className="hidden items-center space-x-2 lg:flex"
                        className="text-sm leading-tight text-muted-foreground"
                      >
                        Sponsor Artists
                        {/* <span className="hidden font-bold lg:inline-block">
                          Top Artists & Fans
                        </span> */}
                        
                    </Link>
                    </div>

                </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps {
  children?: React.ReactNode
  href: string
  disabled?: boolean
  pathname: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function MobileLink({
  children,
  href,
  disabled,
  pathname,
  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        pathname === href && "text-foreground",
        disabled && "pointer-events-none opacity-60"
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  )
}
