import Link from "next/link"
import { db } from "@/db"
//import { products, stores } from "@/db/schema"
import { products, upcoming, artists } from "@/db/schema"

import { desc } from "drizzle-orm"
//import Balance from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

import { SponsorProductCard } from "@/components/sponsor-product-card"
import { WrapProductCard } from "@/components/wrap-product-card"


import { UpcomingCard } from "@/components/upcoming-card"
import { UpcomingDeckCard } from "@/components/upcoming-deck-card"

import { Shell } from "@/components/shells/shell"

import SimpleSlider from "@/components/HomePageCarousel"
import { DiscoverHubsSlider } from "@/components/discover-hubs-slider"

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
    <Shell as="div" className="gap-12 xs:py-0 xs:py-0 md:py-0 ">

      <section className="mx-auto w-full justify-center overflow-hidden rounded-lg">
        {/* <div >
          <SimpleSlider />
        </div> */}
        <div className="relative z-0 mx-auto ">
          <div className="absolute -bottom-12 -z-10 flex w-full justify-center ">
            <div className="h-[248px] w-[310px] max-w-full animate-pulse rounded-full bg-[#FFB619] opacity-40 blur-[100px] "></div>
          </div>
          <div className="flex items-center pb-2 pt-6">
            <div className="flex-1">
              <h2 className="text-2xl font-medium sm:text-3xl ">Discover Studios</h2>
            </div>
            <Button asChild variant="link" className="text-sm text-muted-foreground ">
              <Link href="/featured">View more...</Link>
            </Button>
          </div>
          <div >
            <DiscoverHubsSlider discoverArtists={allArtistCommunities} />
          </div>
        </div>

        <div className="relative z-0 mx-auto  text-center space-y-6 mb-6">
          <div className="absolute left-8 top-8 -z-10 flex w-full ">
            <div className="h-[310px] w-[310px] max-w-full animate-pulse-slow rounded-full bg-[#923CA8] opacity-25 blur-[100px]"></div>
          </div>
          <div className="absolute right-4 bottom-4 -z-20   ">
            <div className="h-[310px] w-[310px] max-w-full animate-pulse-slow rounded-full bg-[#923CA8] opacity-30 blur-[100px]"></div>
          </div>
          <div className="flex items-center pb-2 pt-4">
            <h2 className="text-2xl font-medium sm:text-3xl">Trending Conversations</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {allArtistCommunities.map((artist) => (
              <LobbyCommunityCard key={artist.id} artist={artist} />
            ))}

          </div>
        </div>

        <div className="relative z-0 mx-auto  text-center space-y-6 mb-6">
          <div className="absolute left-8 top-8 -z-10 flex w-full ">
            <div className="h-[310px] w-[310px] max-w-full animate-pulse-slow rounded-full bg-[#923CA8] opacity-25 blur-[100px]"></div>
          </div>
          <div className="absolute right-4 bottom-4 -z-20   ">
            <div className="h-[310px] w-[310px] max-w-full animate-pulse-slow rounded-full bg-[#923CA8] opacity-30 blur-[100px]"></div>
          </div>
          <div className="flex items-center pb-2 pt-4">
            <h2 className="text-2xl font-medium sm:text-3xl">Artist Communities</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {allArtistCommunities.map((artist) => (
              <LobbyCommunityCard key={artist.id} artist={artist} />
            ))}

          </div>
        </div>
      </section>

      {/* <section
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
      </section> */}

      {/* <section
        id="artist-communities"
        aria-labelledby="upcoming-stores-heading"
        className="space-y-6"
      >
        <div className="relative z-0 mx-auto  text-center">
          <div className="absolute -top-4 -z-10 flex w-full justify-center">
            <div className="h-[310px] w-[310px] max-w-full animate-pulse-slow rounded-full bg-[#8678F9] opacity-20 blur-[100px]"></div>
          </div>
          <div className="flex items-center pb-4">
            <h2 className="text-2xl font-medium sm:text-3xl">Artist Communities</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">


            {allArtistCommunities.map((artist) => (
              <LobbyCommunityCard key={artist.id} artist={artist} />
            ))}

          </div>
        </div>
      </section> */}

      {/* <section
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

      </section> */}

    </Shell >
  )
}
