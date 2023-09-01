import { type Metadata } from "next"
import { products, artists } from "@/db/schema"
import { env } from "@/env.mjs"

import { Header } from "@/components/header"
import { Products } from "@/components/products"
import { Shell } from "@/components/shells/shell"
import { getProductsAction } from "@/app/_actions/product"
import { getStoresAction } from "@/app/_actions/store"
import { Icons } from "@/components/icons"
import { Separator } from "@/components/ui/separator"

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Products",
  description: "Buy products from our stores",
}

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const {
    page,
    per_page,
    sort,
    categories,
    subcategories,
    price_range,
    artist_ids,
    store_page,
  } = searchParams

  // Products transaction
  const limit = typeof per_page === "string" ? parseInt(per_page) : 8
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0

  const productsTransaction = await getProductsAction({
    limit,
    offset,
    sort: typeof sort === "string" ? sort : null,
    categories: "sponsorship",
    //subcategories: typeof subcategories === "string" ? subcategories : null,
    price_range: typeof price_range === "string" ? price_range : null,
    artist_ids: typeof artist_ids === "string" ? artist_ids : null,
  })

  const pageCount = Math.ceil(productsTransaction.total / limit)

  // Stores transaction
  const storesLimit = 25
  const storesOffset =
    typeof store_page === "string"
      ? (parseInt(store_page) - 1) * storesLimit
      : 0

  const storesTransaction = await getStoresAction({
    limit: storesLimit,
    offset: storesOffset,
    sort: "productCount.desc",
  })

  const storePageCount = Math.ceil(storesTransaction.total / storesLimit)

  return (
    <Shell>
      {/* <Header
        title= "Artist Sponsorships"
        description= "Support your favorite artist"
        size="sm"
      /> */}
      <div className=" tracking-tight">
              <h1 className="line-clamp-1 text-3xl font-bold mb-6">
                Artist Sponsorships                  
              </h1> 
              <Separator className="mt-2 mb-2 w-2/5" />
              <div className="flex items-center gap-4 text-lg font-medium text-muted-foreground">
                <Icons.heart aria-hidden="true"/>Show support for your favorite artists</div>
              <div className="flex items-center space-y-10 gap-4 text-lg font-medium text-muted-foreground">
                <Icons.badgeCheck aria-hidden="true"/>Get credit and be recognized </div>
                <Separator className="mt-2 w-2/5" />
      </div>
      {/* <div className="flex items-center gap-2 text-lg font-medium w-2/3 text-muted-foreground"></div> */}
      {/* <Icons.users aria-hidden="true"/>Support and connect with {artist.name} below </div> */}
      <Products
        products={productsTransaction.items}
        pageCount={pageCount}
        categories={Object.values(products.category.enumValues)}
        artists={storesTransaction.items}
        storePageCount={storePageCount}
      />
    </Shell>
  )
}