
import { Shell } from "@/components/shells/shell"
import { ArtistProductCard } from "@/components/artist-product-card"
import { db } from "@/db"
import { artists, products } from "@/db/schema"
import { currentUser } from "@clerk/nextjs"
import { eq, inArray } from "drizzle-orm"

export default async function ProductsPage() {
  const user = await currentUser()
  if(!user) {
    throw new Error("user not found")
  }

  const artist = await db.query.artists.findFirst({
    where: eq(artists.userId, user.id)
  })

  if(!artist || !artist.products) {
    throw new Error("artist not found")
  }

  const allProducts = await db.query.products.findMany({
    where: inArray(products.id, artist.products!)
  })

  return (
    <Shell as="div" className="gap-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProducts.map((product) => (
            //<ProductCard key={product.id} product={product} />
            product.category === "deck" ? (
              <ArtistProductCard key={product.id} product={product} />
            ) : product.category === "wrap" ? (
              <ArtistProductCard key={product.id} product={product} />
            ) : product.category === "sponsorship" ? (
              <ArtistProductCard key={product.id} product={product} />
            ) : (
              <ArtistProductCard key={product.id} product={product} />
            )
              
          
          ))}
        </div>
    </Shell>
  )
}

// import { type Metadata } from "next"
// import { notFound } from "next/navigation"
// import { db } from "@/db"
// import { products, artists, type Product } from "@/db/schema"
// import { env } from "@/env.mjs"
// import { and, asc, desc, eq, inArray, like, sql } from "drizzle-orm"

// import { GenerateButton } from "@/components/generate-button"
// import { ProductsTableShell } from "@/components/shells/products-table-shell"
// import { currentUser } from "@clerk/nextjs"

// export const metadata: Metadata = {
//   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
//   title: "Products",
//   description: "Manage your products",
// }

// interface ProductsPageProps {
//   searchParams: {
//     [key: string]: string | string[] | undefined
//   }
// }

// export default async function ProductsPage({
//   searchParams,
// }: ProductsPageProps) {
//   const user = await currentUser()

//   if(!user) {
//     throw new Error("user not found")
//   }

//   const artist = await db.query.artists.findFirst({
//     where: eq(artists.userId, user.id)
//   })

//   if (!artist) {
//     throw new Error("artist not found")
//   }

//   const { page, per_page, sort, name, category } = searchParams

//   // Number of items per page
//   const limit = typeof per_page === "string" ? parseInt(per_page) : 10
//   // Number of items to skip
//   const offset =
//     typeof page === "string"
//       ? parseInt(page) > 0
//         ? (parseInt(page) - 1) * limit
//         : 0
//       : 0
//   // Column and order to sort by
//   const [column, order] =
//     typeof sort === "string"
//       ? (sort.split(".") as [
//           keyof Product | undefined,
//           "asc" | "desc" | undefined,
//         ])
//       : []

//   const categories =
//     typeof category === "string"
//       ? (category.split(".") as Product["category"][])
//       : []

//   // Transaction is used to ensure both queries are executed in a single transaction
//   const { artistProducts, totalProducts } = await db.transaction(async (tx) => {
//     const artistProducts = await tx
//       .select()
//       .from(products)
//       .limit(limit)
//       .offset(offset)
//       .where(
//         and(
//           eq(products.artistID, artist.id),
//           // Filter by name
//           typeof name === "string"
//             ? like(products.name, `%${name}%`)
//             : undefined,
//           // Filter by category
//           categories.length > 0
//             ? inArray(products.category, categories)
//             : undefined
//         )
//       )
//       .orderBy(
//         column && column in products
//           ? order === "asc"
//             ? asc(products[column])
//             : desc(products[column])
//           : desc(products.createdAt)
//       )

//     const totalProducts = await tx
//       .select({
//         count: sql<number>`count(${products.id})`,
//       })
//       .from(products)
//       .where(
//         and(
//           eq(products.artistID, artist.id),
//           typeof name === "string"
//             ? like(products.name, `%${name}%`)
//             : undefined,
//           categories.length > 0
//             ? inArray(products.category, categories)
//             : undefined
//         )
//       )

//     return {
//       artistProducts,
//       totalProducts: Number(totalProducts[0]?.count) ?? 0,
//     }
//   })

//   const pageCount = Math.ceil(totalProducts / limit)

//   return (
//     <div className="space-y-2.5">
//       {env.NODE_ENV !== "production" && <GenerateButton storeId={artist.id} />}
//       <ProductsTableShell
//         data={artistProducts}
//         pageCount={pageCount}
//         artistId={artist.id}
//       />
//     </div>
//   )
// }
