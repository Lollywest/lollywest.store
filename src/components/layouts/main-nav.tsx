"use client"

import * as React from "react"
import Link from "next/link"
import type { MainNavItem } from "@/types"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: MainNavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="hidden gap-6 lg:flex">
      <Link
        aria-label="Home"
        href="/"
        className="hidden items-center space-x-2 lg:flex"
      >
        <Icons.logo className="h-6 w-6" aria-hidden="true" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <Link
        aria-label="Featured"
        href="/featured"
        className="hidden items-center space-x-2 lg:flex"
      >
        <span className="hidden font-bold lg:inline-block">
          Featured
        </span>
      </Link>
      <Link
        aria-label="Leaderboard"
        href="/leaderboard"
        className="hidden items-center space-x-2 lg:flex"
      >
        <span className="hidden font-bold lg:inline-block">
          Leaderboard
        </span>
      </Link>
    </div>
  )
}
