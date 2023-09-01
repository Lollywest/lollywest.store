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
          {/* {siteConfig.name} */}
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {items?.[0]?.items ? (
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-auto">
                {items[0].title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        aria-label="Home"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Icons.logo className="h-6 w-6" aria-hidden="true" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          {siteConfig.name}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          {siteConfig.description}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  {items[0].items.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : null}


          {items?.[0]?.items ? (
            <NavigationMenuItem>
              <Link
                  aria-label="Featured"
                  href="/featured"
                  className="text-sm leading-tight text-muted-foreground"
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Featured&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Link>
                      {/* <span className="hidden font-bold lg:inline-block">
                        Featured Decks
                      </span> */}
              {/* <NavigationMenuTrigger className="h-auto">
                Featured
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">             
                  <li className="row-span-3">
                    <NavigationMenuLink >
                    <Link
                      aria-label="Featured"
                      href="/featured"
                      className="hidden items-center space-x-2 lg:flex"
                    >
                      <span className="mb-2 mt-4 text-lg font-medium">
                        Featured Wraps
                      </span>
                    </Link>
                    <p className="text-sm leading-tight text-muted-foreground">
                          Featured Wraps Description
                    </p>
                    <Link
                      aria-label="Featured"
                      href="/featured"
                      className="hidden items-center space-x-2 lg:flex"
                    >
                      <span className="hidden font-bold lg:inline-block">
                        Featured Decks
                      </span>
                      
                    </Link> */}
                    
                      {/* <a
                        aria-label="Home"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Icons.logo className="h-6 w-6" aria-hidden="true" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          {siteConfig.name}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          {siteConfig.description}
                        </p>
                      </a> */}
                    {/* </NavigationMenuLink>
                  </li> */}
                  {/* {items[0].items.map((item) => (
                    <ListItem
                      //key={item.title}
                      title="TEST TITLE"
                      href="/featured"
                    >
                      {item.description}
                    </ListItem>
                    
                  ))} */}
                {/* </ul> */}
              {/* </NavigationMenuContent> */}
            </NavigationMenuItem>
          ) : null}

          {items?.[0]?.items ? (
            <NavigationMenuItem>
              <Link
                      aria-label="Leaderboard"
                      href="/leaderboard"
                      // className="hidden items-center space-x-2 lg:flex"
                      className="text-sm leading-tight text-muted-foreground"
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Leaderboard&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {/* <span className="hidden font-bold lg:inline-block">
                        Top Artists & Fans
                      </span> */}
                      
                    </Link>
              {/* <NavigationMenuTrigger className="h-auto">
                Leaderboards
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
             
                  <li className="row-span-3">
                    <NavigationMenuLink >

                    <Link
                      aria-label="Leaderboards"
                      href="/leaderboards"
                      className="hidden items-center space-x-2 lg:flex"
                    >
                      <span className="hidden font-bold lg:inline-block">
                        Top Artists & Fans
                      </span>
                      
                    </Link>
                  
 
                    </NavigationMenuLink>
                  </li>
                 
                </ul>
              </NavigationMenuContent> */}
            </NavigationMenuItem>
          ) : null}

          {items?.[0]?.items ? (
            <NavigationMenuItem>
              <Link
                      aria-label="Sponsor Artists"
                      href="/sponsor-artists"
                      // className="hidden items-center space-x-2 lg:flex"
                      className="text-sm leading-tight text-muted-foreground"
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sponsor Artists&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {/* <span className="hidden font-bold lg:inline-block">
                        Top Artists & Fans
                      </span> */}
                      
                    </Link>
              {/* <NavigationMenuTrigger className="h-auto">
                Leaderboards
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
             
                  <li className="row-span-3">
                    <NavigationMenuLink >

                    <Link
                      aria-label="Leaderboards"
                      href="/leaderboards"
                      className="hidden items-center space-x-2 lg:flex"
                    >
                      <span className="hidden font-bold lg:inline-block">
                        Top Artists & Fans
                      </span>
                      
                    </Link>
                  
 
                    </NavigationMenuLink>
                  </li>
                 
                </ul>
              </NavigationMenuContent> */}
            </NavigationMenuItem>
          ) : null}

          {/* {items?.[0]?.items ? (
            <NavigationMenuItem>

                    <Link
                      aria-label="drop-on-lollywest"
                      href="/drop-on-lollywest"
                      //className="hidden items-center space-x-2 lg:flex"
                      className="text-sm leading-tight text-muted-foreground"
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Drop a Wrap&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                      {/* <span className="hidden font-bold lg:inline-block">
                        Drop a Wrap
                      </span> */}
                      
                    {/* </Link>  */}
              {/* <NavigationMenuTrigger className="h-auto">
                Drop on Lollywest
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
             
                  <li className="row-span-3">
                    <NavigationMenuLink >

                    <Link
                      aria-label="Leaderboards"
                      href="/drop-on-lollywest"
                      className="hidden items-center space-x-2 lg:flex"
                    >
                      <span className="hidden font-bold lg:inline-block">
                        Drop a Wrap
                      </span>
                      
                    </Link>

                    </NavigationMenuLink>
                  </li>
                 
                </ul>
              </NavigationMenuContent> */}
            {/* </NavigationMenuItem>
          ) : null} */}

          {/* {items?.[0]?.items ? (
            
            <NavigationMenuItem> */}
  
              {/* <NavigationMenuTrigger className="h-auto"> */}
                {/* <Link
                        aria-label="about-us"
                        href="/about-us"
                        //className="hidden items-center space-x-2 lg:flex"
                        className="text-sm leading-tight text-muted-foreground"
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;About Us */}
                        {/* <span className="hidden font-bold lg:inline-block">
                          About Lollywest
                        </span> */}
                      {/* </Link> */}
                
              {/* </NavigationMenuTrigger> */}
              {/* <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
             
                  <li className="row-span-3">
                    <NavigationMenuLink >

                    <Link
                      aria-label="Leaderboards"
                      href="/about-us"
                      className="hidden items-center space-x-2 lg:flex"
                    >
                      <span className="hidden font-bold lg:inline-block">
                        About Lollywest
                      </span>
                    </Link>
                  
                
                    
                    </NavigationMenuLink>
                  </li>
                 
                </ul>
              </NavigationMenuContent> */}
            {/* </NavigationMenuItem>
          ) : null} */}






          {/* {items
            ?.filter((item) => item.title !== items[0]?.title)
            .map((item) =>
              item?.items ? (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger className="h-auto capitalize">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.items.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                item.href && (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(navigationMenuTriggerStyle(), "h-auto")}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              )
            )} */}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
