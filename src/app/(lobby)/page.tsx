import Link from "next/link"
import { db } from "@/db"
//import { products, stores } from "@/db/schema"
import { products, upcoming, artists } from "@/db/schema"

import { desc } from "drizzle-orm"
//import Balance from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

import { SponsorProductCard } from "@/components/sponsor-product-card"
import { WrapProductCard } from "@/components/wrap-product-card"


import { UpcomingCard } from "@/components/upcoming-card"
import { UpcomingDeckCard } from "@/components/upcoming-deck-card"

import { Shell } from "@/components/shells/shell"

import SimpleSlider from "@/components/HomePageCarousel"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatDate, toTitleCase } from "@/lib/utils"
import { LobbyCommunityCard } from "@/components/lobby-community-card"

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

// This is equivalent to getServersideProps() in the pages directory
// Read more: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = "force-dynamic"

export default async function IndexPage() {
  const allProducts = await db
    .select()
    .from(products)
    .limit(4)
    .orderBy(desc(products.createdAt))

  const allUpcoming = await db
    .select()
    .from(upcoming)
    .limit(4)
    .orderBy(desc(upcoming.createdAt))

  const allArtistCommunities = await db
    .select()
    .from(artists)
    .limit(12)
    .orderBy(desc(artists.createdAt))

  return (
    <Shell as="div" className="gap-12">

      <section className="mx-auto w-full justify-center overflow-hidden rounded-lg">
        <div >
          <SimpleSlider />
        </div>
      </section>

      <section
        id="featured-products"
        aria-labelledby="featured-products-heading"
        className="space-y-6"
      >
        <div className="flex items-center">
          <h2 className="flex-1 text-2xl font-medium sm:text-3xl">
            Trending Now
          </h2>
          <Link href="/featured">
            <div
              className={cn(
                buttonVariants({
                  size: "sm",
                })
              )}
            >
              View all
              <span className="sr-only">View all products</span>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProducts.map((product) => (
            //<ProductCard key={product.id} product={product} />
            product.category === "deck" ? (
              <ProductCard key={product.id} product={product} />
            ) : product.category === "wrap" ? (
              <WrapProductCard key={product.id} product={product} />
            ) : product.category === "sponsorship" ? (
              <SponsorProductCard key={product.id} product={product} />
            ) : (
              <ProductCard key={product.id} product={product} />
            )


          ))}
        </div>
      </section>

      <section
        id="artist-communities"
        aria-labelledby="upcoming-stores-heading"
        className="space-y-6"
      >
        <div className="flex items-center">
          <h2 className="text-2xl font-medium sm:text-3xl">Artist Communities</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* {allArtistCommunities.map((artist) => (
            <Card key={artist.id} className="grid rounded-xl my-4 ">
              <Link
                aria-label={`View details`}
                //   href={`//${artist.id}`}
                href={`/artist-dashboard-page/${artist.id}`}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 ">
                      <CardTitle className="text-xl">{artist.name}</CardTitle>
                    </div>
                   
                  </div>


                  <CardDescription className="">
                    <div className="flex items-center gap-4">
                      <p> Created on {formatDate(artist.createdAt!)}</p>
                    </div>
                  </CardDescription>
                </CardHeader>
               
              </Link>
            </Card>
          ))} */}

          {allArtistCommunities.map((artist) => (
            <LobbyCommunityCard artist={artist} />
          ))}

        </div>

      </section>

      <section
        id="upcoming-stores"
        aria-labelledby="upcoming-stores-heading"
        className="space-y-6"
      >
        <div className="flex items-center">
          <h2 className="text-2xl font-medium sm:text-3xl">Upcoming Drops</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allUpcoming.map((upcomingProducts) => (
            // <UpcomingCard key={upcomingProducts.id} upcomingProducts={upcomingProducts} />
            upcomingProducts.category === "deck" ? (
              <UpcomingDeckCard key={upcomingProducts.id} upcomingProducts={upcomingProducts} />
            ) : upcomingProducts.category === "wrap" ? (
              <UpcomingCard key={upcomingProducts.id} upcomingProducts={upcomingProducts} />
            ) : upcomingProducts.category === "sponsorship" ? (
              <UpcomingCard key={upcomingProducts.id} upcomingProducts={upcomingProducts} />
            ) : (
              <UpcomingCard key={upcomingProducts.id} upcomingProducts={upcomingProducts} />
            )

          ))}
        </div>

      </section>

    </Shell>
  )
}
