"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { type UpcomingProduct } from "@/db/schema"

import { cn , formatDate, toTitleCase } from "@/lib/utils"
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

interface UpcomingCardProps extends React.HTMLAttributes<HTMLDivElement> {
upcomingProducts: UpcomingProduct
  variant?: "default" | "switchable"
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}

export function UpcomingCard({
  upcomingProducts,
  variant = "default",
  isAddedToCart = false,
  onSwitch,
  className,
  
  ...props
}: UpcomingCardProps) {
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
            Upcoming {toTitleCase(upcomingProducts.category)}
          </CardDescription>
          <CardTitle className="line-clamp-1">{upcomingProducts.name}</CardTitle>
          <CardDescription className="line-clamp-2 font-bold">
            {/* {formatPrice(upcomingProducts.price)} */}
            {/* Releasing on: {formatDate(upcomingProducts.releaseDate!)} */}
            Coming soon...
          </CardDescription>
          
          <div className="space-y-2 text-sm text-muted-foreground">
          </div>
        </CardContent>
      {/* </Link> */}
      {/* <CardFooter className="p-4">
        {variant === "default" ? (
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between"> */}
            {/* <Link
              aria-label="Preview product"
              href={`/upcoming/${upcomingProducts.id}`}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "h-8 w-full rounded-sm",
              })}
            >
              Preview
            </Link> */}

            {/* <Button
              aria-label="Add to cart"
              size="sm"
              className="h-8 w-full rounded-sm"
              onClick={() => {
                startTransition(async () => {
                  try {
                    await addToCartAction({
                      upcomingId: upcoming.id,
                      quantity: 1,
                    })
                    toast.success("Added to cart.")
                  } catch (error) {
                    error instanceof Error
                      ? toast.error(error.message)
                      : toast.error("Something went wrong, please try again.")
                  }
                })
              }}
              disabled={isPending}
            >
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Add to cart
            </Button> */}
          {/* </div>

        ) : (
          <Button
            aria-label={isAddedToCart ? "Remove from cart" : "Add to cart"}
            size="sm"
            className="h-8 w-full rounded-sm"
            onClick={() => {
              startTransition(async () => {
                await onSwitch?.()
              })
            }}
            disabled={isPending}
          >
            {isPending ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : isAddedToCart ? (
              <Icons.check className="mr-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <Icons.add className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {isAddedToCart ? "Added" : "Add to cart"}
          </Button>
        )}
      </CardFooter> */}
    </Card>
  )
}
