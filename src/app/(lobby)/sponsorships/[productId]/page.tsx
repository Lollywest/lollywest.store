import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { artists, products } from "@/db/schema"
import { env } from "@/env.mjs"
import { and, eq, not } from "drizzle-orm"

import { toTitleCase } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { SponsorAddToCartForm } from "@/components/forms/sponsorship-add-to-cart-form"
import { Breadcrumbs } from "@/components/pagers/breadcrumbs"
import { ProductCard } from "@/components/product-card"
import { ProductImageCarousel } from "@/components/product-image-carousel"
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
      description: true,
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
    : []

  return (
    <Shell>
      <Breadcrumbs
        segments={[
          {
            title: "Artist Sponsorships",
            href: `/sponsor-artists`,
          },
          // {
          //   title: toTitleCase(product.category),
          //   href: `/sponsor-artists`,
          // },
          {
            title: product.name,
            href: `/product/${product.id}`,
          },
        ]}
      />
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <ProductImageCarousel
          className="w-full md:w-1/2"
          images={product.images ?? []}
          options={{
            loop: true,
          }}
        />
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">{product.name}</h2>
            {/* <p className="text-base text-muted-foreground">
              {formatPrice(product.price)} GOOOOOOOP
            </p> */}
            {artist ? (
              <Link
                href={`/artist-products?artist_ids=${artist.id}`}
                className="line-clamp-1 inline-block text-base text-muted-foreground hover:underline"
              >
                {artist.name}
              </Link>
            ) : null}
          </div>
          <Separator className="my-1.5" />
          <SponsorAddToCartForm productId={productId} />

          <div className="mt-4 space-y-2">
            <h2 className="line-clamp-1 text-xl">Sponsorship Credits:</h2>
            <p className="text-sm text-muted-foreground">
              {/* Credits are {formatPrice(product.price)} per 1 credit on day of sponsorship purchase. */}
              Sponsorship Credits are $1.00 per 1 credit.
            </p>
            <p className="text-sm text-muted-foreground">
              {/* Sponsorship credits will multiply by XX.XX% each day/week after purchase. E.g., 1 credits will become 2 credits XX days after purchase, etc.  */}
              Credits will be added to the associated purchasing account after
              purchase
            </p>
            {/* <p className="text-sm text-muted-foreground">
              E.g. 1 credits will become 2 credits XX days after purchase. 
            </p>  */}
          </div>

          {/* <Separator className="my-1.5" /> */}

          <Separator className="mb-12 mt-5" />

          <Accordion type="single" collapsible className="w-full text-sm">
            <AccordionItem value="description">
              <AccordionTrigger>Sponsorship Description</AccordionTrigger>
              <AccordionContent>
                Sponsor {artist?.name}: {"\n"}
                {artist?.description ??
                  "No description is available for this product."}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How much does it cost?</AccordionTrigger>
              <AccordionContent>You decide!</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What do sponsorship credits get me?
              </AccordionTrigger>
              <AccordionContent>
                Sponsorship credits elevate your ranking on our leaderboard,
                unlock the ability to receive exclusive merchandise from artist
                collaborations with Lollywest, and grant you official
                sponsorship status with your favorite artist.
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
