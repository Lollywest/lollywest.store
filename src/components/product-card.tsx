"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { type Product } from "@/db/schema"
import { toast } from "sonner"

import { cn, formatPrice, toTitleCase } from "@/lib/utils"
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

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product
  variant?: "default" | "switchable"
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}


export function ProductCard({
  product,
  variant = "default",
  isAddedToCart = false,
  onSwitch,
  className,
  ...props
}: ProductCardProps) {
  const [isPending, startTransition] = React.useTransition()

  

  

  return (
    <Card
      className={cn("h-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <Link
        aria-label={`View ${product.name} details`}
        href={`/product/${product.id}`}
      >
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
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
      <Link
        aria-label={`View ${product.name} details`}
        href={`/product/${product.id}`}
      >
        <CardContent className="grid gap-2.5 p-4">
          <CardDescription className="line-clamp-2">
            {/* {toTitleCase(product.category)} by {toTitleCase(product.name)} */}
            {toTitleCase(product.category)}
          </CardDescription>
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {formatPrice(product.price)}
          </CardDescription>
          <div className="space-y-2 text-sm text-muted-foreground">
            {/* {plan.features.map((feature) => ( */}
              {/* <div key={feature} className="flex items-center gap-2"> */}
              <div className="flex items-center gap-2">
                {/* <Icons.check className="h-4 w-4" aria-hidden="true" /> */}
                <span>Included Perks: </span>
                {/* <span>{product.perks}</span> */}
                {/* {toTitleCase(product.perks)} */}
              </div>
              {/* <div className="flex items-center gap-2">
                <Icons.addCircle className="h-4 w-4" aria-hidden="true" />
                <span>Feature 2</span>
              </div> */}
              {/* <div className="flex items-center gap-2">
                <Icons.alarm className="h-4 w-4" aria-hidden="true" />
                <span>Feature 3</span>
              </div> */}
              {/* <div className="flex items-center gap-2">
                <Icons.dollarSign className="h-4 w-4" aria-hidden="true" />
                <span>Feature 3</span>
              </div> */}
              <div className="space-y-2 text-sm text-muted-foreground">
                  {product.perks?.map((perks) => (
                    <div key={perks} className="flex items-center gap-2">
                      <Icons.addCircle className="h-4 w-4" aria-hidden="true" />
                      <span>{perks}</span>
                    </div>
                  ))}
                <div className="flex items-center gap-2">
                    <Icons.chevronsRight className="h-4 w-4" aria-hidden="true" />
                    <span>Click to see additional perks</span>
                    {/* <Icons.chevronsLeft className="h-4 w-4" aria-hidden="true" /> */}
                    
                    {/* <Icons.view className="h-4 w-4" aria-hidden="true" /> */}
                   
                </div> 
              </div>
            {/* ))} */}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
        {variant === "default" ? (
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <Link
              aria-label="Preview product"
              href={`/product-preview/${product.id}`}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "h-8 w-full rounded-sm",
              })}
            >
              Preview
            </Link>
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
              Add to cart
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
