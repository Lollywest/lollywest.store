import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/db"
//import { products, stores } from "@/db/schema"
import { artists, products } from "@/db/schema"
import { env } from "@/env.mjs"
import { and, eq, not } from "drizzle-orm"

import { formatPrice, toTitleCase } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { AddToCartForm } from "@/components/forms/add-to-cart-form"
import { Icons } from "@/components/icons"
import { Breadcrumbs } from "@/components/pagers/breadcrumbs"
import { ProductCard } from "@/components/product-card"
import { ProductImageCarousel } from "@/components/product-image-carousel"
import Image from "next/image"
import { Shell } from "@/components/shells/shell"
import { SponsorProductCard } from "@/components/sponsor-product-card"
import { WrapProductCard } from "@/components/wrap-product-card"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Product",
  description: "Product description",
}

interface ProductPageProps {
  params: {
    productId: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = Number(params.productId)

  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  })

  if (!product) {
    notFound()
  }

  const artist = await db.query.artists.findFirst({
    columns: {
      id: true,
      name: true,
    },
    where: eq(artists.id, product.artistID),
  })

  const productsFromStore = artist
    ? await db
      .select()
      .from(products)
      .limit(4)
      .where(
        and(
          eq(products.artistID, product.artistID),
          not(eq(products.id, productId))
        )
      )
    : //.orderBy(desc(products.inventory))
    []

  return (
    <Shell>
      <Breadcrumbs
        segments={[
          {
            title: "Featured",
            href: "/featured",
          },
          // {
          //   title: toTitleCase(product.category),
          //   href: `/products?category=${product.category}`,
          // },
          {
            title: product.name,
            href: `/product/${product.id}`,
          },
        ]}
      />
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <ProductImageCarousel
          className="w-full rounded-xl md:w-1/2"
          images={product.images ?? []}
          options={{
            loop: true,
          }}
        />
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">{product.name}</h2>
            <p className="text-base text-muted-foreground">
              {formatPrice(product.price)}/Month
              {/* (Includes {Math.round(Number(product.price))} Free Credits/Mo.)  */}
              <p className="text-base text-muted-foreground">
                {/* {formatPrice(product.price)}/Month    */}
                (Includes {Math.round(Number(product.price))} Free Credits/Mo.)
              </p>
            </p>

            {artist ? (
              <Link
                href={`/artist-products?artist_ids=${artist.id}`}
                // className="line-clamp-1 inline-block text-base text-muted-foreground hover:underline"
                className="line-clamp-1 inline-block text-base hover:underline"
              >
                {artist.name}
              </Link>
            ) : null}
          </div>
          <Separator className="my-1.5" />
          <div className="flex items-center justify-between">
            <AddToCartForm productId={productId} />
            {/* <p className="text-base text-muted-foreground w-1/2">*Purchase includes 20 Sponsorship Credits</p> */}
          </div>

          <Separator className="my-1.5" />
          <div className="space-y-2 text-sm ">
            <div className="flex items-center gap-2 text-xl font-bold">
              {/* <Icons.check className="h-4 w-4" aria-hidden="true" /> */}
              <span>Exclusive Perks:</span>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              {product.perks?.map((perks) => (
                <div key={perks} className="flex items-center gap-2">
                  {/* <Icons.star className="h-4 w-4" aria-hidden="true" /> */}
                  <Image
                    className="h-5 w-5"
                    src="/images/avatar/shield1.svg"
                    width={400}
                    height={400}
                    alt="verified"
                  />
                  <span>{perks}</span>
                </div>
              ))}
            </div>
          </div>
          <Separator className="mt-5" />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Wrap Description</AccordionTrigger>
              <AccordionContent>
                {product.description ??
                  "No description is available for this wrap."}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      {artist && productsFromStore.length > 0 ? (
        <div className="overflow-hidden md:pt-6">
          <h2 className="line-clamp-1 flex-1 text-2xl font-bold">
            More from {artist.name}
          </h2>
          <div className="overflow-x-auto pb-2 pt-6">
            <div className="flex w-fit gap-4">
              {productsFromStore.map((product) =>
                product.category === "deck" ? (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className="min-w-[260px]"
                  />
                ) : product.category === "wrap" ? (
                  <WrapProductCard
                    key={product.id}
                    product={product}
                    className="min-w-[260px]"
                  />
                ) : product.category === "sponsorship" ? (
                  <SponsorProductCard
                    key={product.id}
                    product={product}
                    className="min-w-[260px]"
                  />
                ) : (
                  <ProductCard key={product.id} product={product} />
                )
              )}
            </div>
          </div>
        </div>
      ) : null}
    </Shell>
  )
}
