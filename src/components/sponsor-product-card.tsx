"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { type Product } from "@/db/schema"
import { toast } from "sonner"

import { cn, toTitleCase } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
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

interface SponsorProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product
  variant?: "default" | "switchable"
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}

export function SponsorProductCard({
  product,
  variant = "default",
  isAddedToCart = false,
  onSwitch,
  className,
  ...props
}: SponsorProductCardProps) {
  const [isPending, startTransition] = React.useTransition()

  return (
    <Card
      className={cn(
        "grid h-full grid-rows-[1fr,auto] overflow-hidden rounded-3xl",
        className
      )}
      {...props}
    >
      <div className="overflow-hidden">
        <Link
          aria-label={`View ${product.name} details`}
          href={`/sponsorships/${product.id}`}
        >
          <CardHeader className="border-b p-0">
            <AspectRatio ratio={1 / 1}>
              {product?.images?.length ? (
                <Image
                  src={
                    product.images[0]?.url ?? "/images/product-placeholder.webp"
                  }
                  alt={product.images[0]?.name ?? product.name}
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
        </Link>
        {/* <div className="flex-1 overflow-hidden"> */}
        <Link
          aria-label={`View ${product.name} details`}
          href={`/sponsorships/${product.id}`}
        >
          <CardContent className="grid gap-2.5 p-4">
            <CardDescription className="line-clamp-2">
              {/* {toTitleCase(product.category)} by {toTitleCase(product.name)} */}
              Verified {toTitleCase(product.category)}
            </CardDescription>
            <CardTitle className="line-clamp-1">{product.name}</CardTitle>
            {/* <CardDescription className="line-clamp-2">
            {formatPrice(product.price)}
            </CardDescription> */}
            <div className="space-y-2 text-sm text-muted-foreground">

              <div className="space-y-3 text-sm text-muted-foreground">

                <div className="flex items-center gap-2">
                  {/* <Icons.check className="h-4 w-4" aria-hidden="true" /> */}
                  <span></span>
                </div>


                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      {/* <Icons.check className="h-4 w-4" aria-hidden="true" /> */}
                      <Image
                        className="h-5 w-5"
                        src="/images/avatar/verified1.svg"
                        width={800}
                        height={800}
                        alt="star"
                      />
                      <span>Become a Verified Artist Sponsor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* <Icons.heart className="h-4 w-4" aria-hidden="true" /> */}
                      <Image
                        className="h-5 w-5"
                        src="/images/avatar/heart-check.svg"
                        width={800}
                        height={800}
                        alt="star"
                      />
                      <span>Recieve Sponsorship Credits</span>
                      {/* <Icons.chevronsLeft className="h-4 w-4" aria-hidden="true" /> */}

                      {/* <Icons.view className="h-4 w-4" aria-hidden="true" /> */}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Link>
          </div>
            <CardFooter className="p-4">
              {variant === "default" ? (
                <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
                  <Button
                    aria-label="Add to cart"
                    size="sm"
                    className="h-8 w-full rounded-sm"
                    onClick={() => {
                      startTransition(async () => {
                        try {
                          await addToCartAction({
                            productId: product.id,
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
                    Sponsor this Artist
                  </Button>
                </div>
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
            </CardFooter>
          </Card>
          )
}
