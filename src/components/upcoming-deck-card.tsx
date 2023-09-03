"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { type UpcomingProduct } from "@/db/schema"
import { toast } from "sonner"

import { cn, formatPrice , formatDate, toTitleCase } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { addToCartAction } from "@/app/_actions/cart"

interface UpcomingDeckCardProps extends React.HTMLAttributes<HTMLDivElement> {
upcomingProducts: UpcomingProduct
  variant?: "default" | "switchable"
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}

export function UpcomingDeckCard({
  upcomingProducts,
  variant = "default",
  isAddedToCart = false,
  onSwitch,
  className,
  
  ...props
}: UpcomingDeckCardProps) {
  const [isPending, startTransition] = React.useTransition()

  return (
    <Card
      className={cn("h-full overflow-hidden rounded-3xl", className)}
      {...props}
    >
      {/* <Link
        aria-label={`View ${upcomingProducts.name} details`}
        href={`/upcoming/${upcomingProducts.id}`}
      > */}
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={1/1}>
            {upcomingProducts?.images?.length ? (
              <Image
                src={
                    upcomingProducts.images[0]?.url ?? "/images/product-placeholder.webp"
                }
                alt={upcomingProducts.images[0]?.name ?? upcomingProducts.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <div
                aria-label="Placeholder"
                role="img"
                aria-roledescription="placeholder"
                className="flex h-full w-full items-center justify-center bg-secondary"
              >
                <Icons.placeholder
                  className="h-9 w-9 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            )}
          </AspectRatio>
        </CardHeader>
      {/* </Link> */}
      {/* <Link
        aria-label={`View ${upcomingProducts.name} details`}
        href={`/upcoming/${upcomingProducts.id}`}
      > */}
        <CardContent className="grid gap-2.5 p-4">
          <CardDescription className="line-clamp-2">
            {toTitleCase(upcomingProducts.category)}
          </CardDescription>
          <CardTitle className="line-clamp-1">{upcomingProducts.name}</CardTitle>
          <CardDescription className="line-clamp-2 font-bold">
            {/* {formatPrice(upcomingProducts.price)} */}
            {/* Releasing on: {formatDate(upcomingProducts.releaseDate!)} */}
            Coming soon...
          </CardDescription>
          <CardDescription className="line-clamp-2">
            {/* {formatPrice(upcomingProducts.price)} */}
            <div  className="flex items-center gap-2">
              {/* <Icons.star className="h-4 w-4" aria-hidden="true" /> */}
                <Image
                  className="h-5 w-5"
                  src="/images/avatar/diamond1.svg"
                  width={800}
                  height={800}
                  alt="star"
                />
              <span>Small quantitiy release</span>
            </div>
          </CardDescription>
          <CardDescription className="line-clamp-2">
            {/* {formatPrice(upcomingProducts.price)} */}
            <div  className="flex items-center gap-2">
              {/* <Icons.star className="h-4 w-4" aria-hidden="true" /> */}
                <Image
                  className="h-5 w-5"
                  src="/images/avatar/diamond1.svg"
                  width={800}
                  height={800}
                  alt="star"
                />
              <span>Top-Tier Exclusive Perks </span>
            </div>
          </CardDescription>

                  
          <div className="space-y-2 text-sm text-muted-foreground">
          
          </div>
        </CardContent>
     
    </Card>
  )
}
