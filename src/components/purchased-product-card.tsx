"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { type Product } from "@/db/schema"

import { cn, formatPrice, toTitleCase } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
    product: Product
}

export function PurchasedProductCard({
    product,
    className,
    ...props
}: ProductCardProps) {

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
                        {toTitleCase(product.category)}
                    </CardDescription>
                    <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                        {formatPrice(product.price)}
                    </CardDescription>

                </CardContent>
            </Link>
            <CardFooter className="p-4">
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
                </div>
            </CardFooter>
        </Card>
    )
}
