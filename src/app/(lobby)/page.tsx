import Link from "next/link"
import { db } from "@/db"
//import { products, stores } from "@/db/schema"
import { products, upcoming } from "@/db/schema"

import { desc } from "drizzle-orm"
//import Balance from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

import { SponsorProductCard } from "@/components/sponsor-product-card"
import { WrapProductCard } from "@/components/wrap-product-card"


import { UpcomingCard } from "@/components/upcoming-card"
import { Shell } from "@/components/shells/shell"

import SimpleSlider  from "@/components/HomePageCarousel"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
        id="upcoming-stores"
        aria-labelledby="upcoming-stores-heading"
        className="space-y-6"
      >
        <div className="flex items-center">
        <h2 className="text-2xl font-medium sm:text-3xl">Upcoming Drops</h2>
        </div>
            
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allUpcoming.map((upcomingProducts) => (
            <UpcomingCard key={upcomingProducts.id} upcomingProducts={upcomingProducts} />
            
          ))}
        </div>
        
      </section>
    
    </Shell>
  )
}
