import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/db"
//import { products, stores } from "@/db/schema"
import { upcoming, artists } from "@/db/schema"

import { env } from "@/env.mjs"
import { and, eq, not } from "drizzle-orm"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Breadcrumbs } from "@/components/pagers/breadcrumbs"
import { UpcomingCard } from "@/components/upcoming-card"
import { ProductImageCarousel } from "@/components/product-image-carousel"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Upcoming",
  description: "Upcoming description",
}

interface UpcomingPageProps {
    params: {
      upcomingId: string
    }
  }

export default async function UpcomingProductPage({ params }: UpcomingPageProps) {
    
  const upcomingId = Number(params.upcomingId)

  const upcomingProducts = await db.query.upcoming.findFirst({
    where: eq(upcoming.id, upcomingId),
  })

  if (!upcomingProducts) {
    notFound()
  }

    const artist = await db.query.artists.findFirst({    
        columns: {
        id: true,
        name: true,
    },
    where: eq(artists.id, upcomingProducts.artistID),
  })
  

  
  const productsFromStore = artist
    ? await db
    .select()
    .from(upcoming)
    .limit(4)
    .where(
      and(
        eq(upcoming.artistID, upcomingProducts.artistID),
        not(eq(upcoming.id, upcomingId))
      )
    )
    : []


  return (
    <Shell>
      <Breadcrumbs
        segments={[
          {
            title: "Upcoming",
            href: "/upcomingProducts",
          },
          {
            title: upcomingProducts.name,
            href: `/upcomingProducts/${upcomingProducts.id}`,
          },
        ]}
      />
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <ProductImageCarousel
          className="w-full md:w-1/2"
          images={upcomingProducts.images ?? []}
          options={{
            loop: true,
          }}
        />
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">{upcomingProducts.name}</h2>
            <p className="text-base text-muted-foreground">
              {/* {formatPrice(upcomingProducts.price)} */}
              More details to be announced soon...
            </p>
            {artist ? (
              <Link
                href={`/artist-products?artist_ids=${artist.id}`}
                className="line-clamp-1 inline-block text-base text-muted-foreground hover:underline"
              >
                {artist.name}
              </Link>
            ) : null}
          </div>
          {/* <Separator className="my-1.5" /> */}
          {/* <AddToCartForm upcomingId={upcomingId} /> */}
          <Separator className="mt-5" />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {upcomingProducts.description ??
                  "No description is available for this product."}
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
              {productsFromStore.map((upcomingProducts) => (
                <UpcomingCard
                  key={upcomingProducts.id}
                  upcomingProducts={upcomingProducts}
                  className="min-w-[260px]"
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </Shell>
  )
}
