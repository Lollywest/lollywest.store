import { type Metadata } from "next"
import { db } from "@/db"
import { artists, products } from "@/db/schema"
import { env } from "@/env.mjs"
import { eq } from "drizzle-orm"

import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import { Products } from "@/components/products"
import { Shell } from "@/components/shells/shell"
import { getProductsAction } from "@/app/_actions/product"
import { getStoresAction } from "@/app/_actions/store"

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
    price_range,
    // store_ids,
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
    categories: typeof categories === "string" ? categories : null,
    //subcategories: typeof subcategories === "string" ? subcategories : null,
    price_range: typeof price_range === "string" ? price_range : null,
    // store_ids: typeof store_ids === "string" ? store_ids : null,
    artist_ids: typeof artist_ids === "string" ? artist_ids : null,
    //  artist_name: typeof artist_name === "string" ? artist_name : null,
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

  const artistsId = Number(artist_ids)

  const artist = await db.query.artists.findFirst({
    columns: {
      id: true,
      name: true,
      description: true,
    },
    where: eq(artists.id, artistsId),
  })

  return (
    <Shell>
      {artist ? (
        <div className="space-y-2 tracking-tight">
          <h1 className="line-clamp-1 text-5xl font-bold">{artist.name}</h1>
          <Separator className="mt-4 w-3/5" />
          <div className=" w-3/5 text-lg font-medium text-muted-foreground">
            {artist.description}
          </div>
          <Separator className="mt-4 w-3/5" />
          <div className="flex w-2/3 items-center gap-2 text-lg font-medium text-muted-foreground">
            <Icons.users aria-hidden="true" />
            Support and connect with {artist.name} below{" "}
          </div>
        </div>
      ) : null}
      {/* <Header
        // title="Artist Test Page"
        
        title = {artist.name}
        description="Buy products from our stores"
        size="sm"
      /> */}
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
