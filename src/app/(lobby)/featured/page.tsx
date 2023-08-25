import { type Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { env } from "@/env.mjs"
import { allPosts } from "contentlayer/generated"
import dayjs from "dayjs"

import { formatDate } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shells/shell"

import { type Product } from "@/db/schema"

import { toTitleCase, unslugify } from "@/lib/utils"
import { Products } from "@/components/products"
import { getProductsAction } from "@/app/_actions/product"
import { getStoresAction } from "@/app/_actions/store"

import { db } from "@/db"
import { products, stores } from "@/db/schema"
import { desc, eq, sql } from "drizzle-orm"
import Balance from "react-wrap-balancer"

import { productCategories } from "@/config/products"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"


interface SubcategoryPageProps {
  params: {
    category: Product["category"]
    subcategory: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}



export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Blog",
  description: "Explore the latest news and updates from the community",
}

export default async function FeaturedPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())

  const allProducts = await db
  .select()
  .from(products)
  .limit(8)
  .orderBy(desc(products.createdAt))

  const allStoresWithProductCount = await db
    .select({
      id: stores.id,
      name: stores.name,
      description: stores.description,
      productCount: sql<number>`count(${products.id})`,
    })
    .from(stores)
    .limit(4)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(sql<number>`count(${products.id})`))

  return (
    <Shell className="md:pb-10">
      <Header
        title="Featured"
        description="Featured Artists, Decks, and Wraps"
      />
      <Separator className="mb-2.5" />

      <section
        id="featured-products"
        aria-labelledby="featured-products-heading"
        className="space-y-6"
      >
        <div className="flex items-center">
          <h2 className="flex-1 text-2xl font-medium sm:text-3xl">
            Our Favorites
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

      {/* <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post, i) => (
          <Link key={post.slug} href={post.slug}>
            <article className="flex flex-col space-y-2.5">
              <AspectRatio ratio={16 / 9}>
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 100vw"
                    className="rounded-lg object-cover"
                    priority={i <= 1}
                  />
                ) : (
                  <div
                    aria-label="Placeholder"
                    role="img"
                    aria-roledescription="placeholder"
                    className="flex h-full w-full items-center justify-center rounded-lg bg-secondary"
                  >
                    <Icons.placeholder
                      className="h-9 w-9 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </AspectRatio>
              <h2 className="line-clamp-1 text-xl font-semibold">
                {post.title}
              </h2>
              <p className="line-clamp-2 text-muted-foreground">
                {post.description}
              </p> */}
              {/* {post.date ? (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.date)}
                </p>
              ) : null} */}
            {/* </article>
          </Link>
        ))}
      </div> */}
      
    </Shell>
  )
}
