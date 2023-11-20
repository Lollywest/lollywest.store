import { type Metadata } from "next"
import { env } from "@/env.mjs"

import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"



import { db } from "@/db"
//import { products, stores } from "@/db/schema"
import { products, artists } from "@/db/schema"
import { desc } from "drizzle-orm"
//mport Balance from "react-wrap-balancer"

import { ProductCard } from "@/components/product-card"
import { SponsorProductCard } from "@/components/sponsor-product-card"
import { WrapProductCard } from "@/components/wrap-product-card"
import { LobbyCommunityCard } from "@/components/lobby-community-card"


export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Blog",
  description: "Explore the latest news and updates from the community",
}

export default async function FeaturedPage() {

  // const allProducts = await db
  //   .select()
  //   .from(products)
  //   .limit(8)
  //   .orderBy(desc(products.createdAt))

  const allArtistCommunities = await db
    .select()
    .from(artists)
    .limit(12)
    .orderBy(desc(artists.createdAt))

  return (
    <Shell className="md:pb-10">
      <Header
        title="Discover"
        description="Discover new artists and Studios"
      />
      <Separator className="mb-2.5" />

      <section
        id="featured-products"
        aria-labelledby="featured-products-heading"
        className="space-y-6"
      >
        <div className="flex items-center">
          <h2 className="flex-1 text-2xl font-medium sm:text-3xl">
            Trending Now
          </h2>
          {/* <Link href="/products">
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
          </Link> */}
        </div>
        {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div> */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allArtistCommunities.map((artist) => (
            <LobbyCommunityCard key={artist.id} artist={artist} />
            //<ProductCard key={product.id} product={product} />
            // product.category === "deck" ? (
            //   <ProductCard key={product.id} product={product} />
            // ) : product.category === "wrap" ? (
            //   <WrapProductCard key={product.id} product={product} />
            // ) : product.category === "sponsorship" ? (
            //   <SponsorProductCard key={product.id} product={product} />
            // ) : (
            //   <ProductCard key={product.id} product={product} />
            // )

          ))}
        </div>
      </section>

    </Shell>
  )
}
