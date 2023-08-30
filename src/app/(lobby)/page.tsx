import Image from "next/image"
import Link from "next/link"
import { db } from "@/db"
//import { products, stores } from "@/db/schema"
import { products, upcoming } from "@/db/schema"

import { desc, eq, sql } from "drizzle-orm"
//import Balance from "react-wrap-balancer"

import { productCategories } from "@/config/products"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { ProductCard } from "@/components/product-card"
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

  // const allStoresWithProductCount = await db
  // const upcomingDrops = await db
  //   .select()
  //     // id: upcoming.id,
  //     // artistID: upcoming.artistID,
  //     // name: upcoming.name,
  //     // description: upcoming.description,
  //     // productCount: sql<number>`count(${products.id})`,
  //     //productCount: sql<number>`count(${upcoming.id})`,
    
  //   .from(upcoming)
  //   .limit(4)
  //   .orderBy(desc(products.createdAt))
    // .leftJoin(upcoming, eq(upcoming.artistID, upcoming.id))
    // .groupBy(upcoming.artistID)
    // .orderBy(desc(sql<number>`count(${upcoming.id})`))

    // const StyledTitle = styled.div`
    //   font-size: 28px;
    //   font-weight: 600;
    //   color: white;
    // `;

    // const Title = (props: { title: string }) => (
    //   <StyledTitle>{props.title}</StyledTitle>
    // );


  return (
    <Shell as="div" className="gap-12">

      {/* <section className="items-center justify-center "> */}
      {/* <section className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-2 pb-2 pt-2 text-center md:pb-12 md:pt-10 lg:py-8"> */}
      {/* <section className = "mx-auto flex w-full flex-col items-center justify-center  text-center overflow-hidden"> */}
      {/* <section className="mx-auto flex w-full flex-col items-center justify-center gap-2 text-center overflow-hidden rounded-lg"> */}
      <section className="mx-auto w-full justify-center overflow-hidden rounded-lg">  
      {/* <div style={{ maxWidth: '1500px', maxHeight: '500px', width: '100vw', height: '33vw', position: 'relative' }}> */}
        <div >
         {/* <div style={{ width: '100vw', height: '33vw', position: 'relative' }}> */}
          {/* <div  style={{ width: '1500px', height: '500px' }}> */}
            <SimpleSlider />
          </div>
        {/* </div> */}
      </section>
      
      {/* <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-8"
      > */}
        
        {/* <div className="flex flex-wrap items-center justify-center gap-4"> */}
        

        {/* <h1 className="text-5xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          Lollywest
        </h1>
        <Balance className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
          A marketplace for creators and fans. Join Now!
        </Balance>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/featured"
            className={cn(
              buttonVariants({
                size: "lg",
              })
            )}
          >
            Browse Now
          </Link> */}
          {/* <Link
            href="/dashboard/stores"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              })
            )}
          >
            Sell Now
          </Link> */}
        {/* </div> */}
        
      {/* </section> */}
      {/* <section
        id="categories"
        aria-labelledby="categories-heading"
        className="space-y-6 py-6 md:pt-10 lg:pt-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Categories
          </h2>
          <Balance className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Explore our categories and find the best products for you
          </Balance>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productCategories.map((category) => (
            <Link
              aria-label={`Go to ${category.title}`}
              key={category.title}
              href={`/categories/${category.title}`}
            >
              <div className="group relative overflow-hidden rounded-md">
                <AspectRatio ratio={4 / 5}>
                  <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
                  <Image
                    src={category.image}
                    alt={category.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    priority
                  />
                </AspectRatio>
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <h3 className="text-3xl font-medium capitalize text-slate-100 md:text-2xl">
                    {category.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section> */}
      {/* <section
        id="create-a-store-banner"
        aria-labelledby="create-a-store-banner-heading"
        className="grid place-items-center gap-6 rounded-lg border bg-card px-6 py-16 text-center text-card-foreground shadow-sm"
      >
        <h2 className="text-2xl font-medium sm:text-3xl">
          Do you want to sell your products on our website?
        </h2>
        <Link href="/dashboard/stores">
          <div className={cn(buttonVariants())}>
            Create a store
            <span className="sr-only">Create a store</span>
          </div>
        </Link>
      </section> */}
      
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
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
            
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {allUpcoming.map((upcomingProducts) => (
            <UpcomingCard key={upcomingProducts.id} upcomingProducts={upcomingProducts} />
          ))}
        </div>

        {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allUpcoming.map((upcomingDrops) => (
            <Card key={upcomingDrops.id} className="flex h-full flex-col">
              <CardHeader className="flex-1">
                <CardTitle className="line-clamp-1">{upcomingDrops.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {upcomingDrops.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <Link href={`/products?artist_ids=${upcomingDrops.id}`}> */}
                {/* <Link href={`/upcoming?artist_ids=${upcomingDrops.id}`}> */}
                {/* <Link href={`/upcoming?artistID=${upcomingDrops.id}`}>
                  <div
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        className: "h-8 w-full",
                      })
                    )}
                  >
                    View */}
                    {/* View Upcoming ({store.productCount})
                    <span className="sr-only">{`${store.name} store products`}</span> */}
                  {/* </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>  */}
        
      </section>
      {/* <section
        id="random-subcategories"
        aria-labelledby="random-subcategories-heading"
        className="flex flex-wrap items-center justify-center gap-4 pb-4"
      >
        {productCategories[
          Math.floor(Math.random() * productCategories.length)
        ]?.subcategories.map((subcategory) => (
          <Link
            key={subcategory.slug}
            href={`/categories/${String(productCategories[0]?.title)}/${
              subcategory.slug
            }`}
          >
            <Badge variant="secondary" className="rounded px-3 py-1">
            <Badge  className="rounded px-3 py-1"> 
              {subcategory.title}
            </Badge>
            <span className="sr-only">{subcategory.title}</span>
          </Link>
        ))}
      </section> */}
    </Shell>
  )
}
