"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { products, orders, wallets, type Product } from "@/db/schema"
import type { StoredFile } from "@/types"
import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  inArray,
  like,
  lt,
  lte,
  not,
  sql,
  between
} from "drizzle-orm"
import { type z } from "zod"

import type {
  getProductSchema,
  getProductsSchema,
  productSchema,
} from "@/lib/validations/product"
import { S } from "drizzle-orm/query-promise.d-0dd411fc"

export async function filterProductsAction(query: string) {
  if (query.length === 0) return null

  const filteredProducts = await db
    .select({
      id: products.id,
      name: products.name,
      category: products.category,
    })
    .from(products)
    .where(like(products.name, `%${query}%`))
    .orderBy(desc(products.createdAt))
    .limit(10)

  const productsByCategory = Object.values(products.category.enumValues).map(
    (category) => ({
      category,
      products: filteredProducts.filter(
        (product) => product.category === category
      ),
    })
  )

  return productsByCategory
}

export async function getProductsAction(
  input: z.infer<typeof getProductsSchema>
) {
  const [column, order] =
    (input.sort?.split(".") as [
      keyof Product | undefined,
      "asc" | "desc" | undefined,
    ]) ?? []
  const [minPrice, maxPrice] = input.price_range?.split("-") ?? []
  const categories =
    (input.categories?.split(".") as Product["category"][]) ?? []
  const artistIds = input.artist_ids?.split(".").map(Number) ?? []

  const { items, total } = await db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(products)
      .limit(input.limit)
      .offset(input.offset)
      .where(
        and(
          categories.length
            ? inArray(products.category, categories)
            : undefined,
          minPrice ? gte(products.price, minPrice) : undefined,
          maxPrice ? lte(products.price, maxPrice) : undefined,
          artistIds.length ? inArray(products.artistID, artistIds) : undefined
        )
      )
      .orderBy(
        column && column in products
          ? order === "asc"
            ? asc(products[column])
            : desc(products[column])
          : desc(products.createdAt)
      )

    const total = await tx
      .select({
        count: sql<number>`count(${products.id})`,
      })
      .from(products)
      .where(
        and(
          categories.length
            ? inArray(products.category, categories)
            : undefined,
          minPrice ? gte(products.price, minPrice) : undefined,
          maxPrice ? lte(products.price, maxPrice) : undefined,
          artistIds.length ? inArray(products.artistID, artistIds) : undefined
        )
      )

    return {
      items,
      total: Number(total[0]?.count) ?? 0,
    }
  })

  return {
    items,
    total,
  }
}

export async function checkProductAction(input: { name: string; id?: number }) {
  const productWithSameName = await db.query.products.findFirst({
    where: input.id
      ? and(not(eq(products.id, input.id)), eq(products.name, input.name))
      : eq(products.name, input.name),
  })

  if (productWithSameName) {
    throw new Error("Product name already taken.")
  }
}

export async function addProductAction(
  input: z.infer<typeof productSchema> & {
    artistId: number
    images: StoredFile[] | null
    perks: string[] | null
    owners: number[] | null
  }
) {
  const productWithSameName = await db.query.products.findFirst({
    where: eq(products.name, input.name),
  })

  if (productWithSameName) {
    throw new Error("Product name already taken.")
  }

  //ask charlie ==================================================
  await db.insert(products).values({
    ...input,
    artistID: input.artistId,
    images: input.images,
    perks: input.perks,
    owners: input.owners
  })

  revalidatePath(`/dashboard/stores/${input.artistId}/products.`)
}

export async function updateProductAction(
  input: z.infer<typeof productSchema> & {
    storeId: number
    id: number
    images: StoredFile[] | null
    perks: string[] | null
    owners: number[] | null
  }
) {
  const product = await db.query.products.findFirst({
    where: and(eq(products.id, input.id), eq(products.artistID, input.artistId)),
  })

  if (!product) {
    throw new Error("Product not found.")
  }

  await db.update(products).set(input).where(eq(products.id, input.id))

  revalidatePath(`/dashboard/stores/${input.storeId}/products/${input.id}`)
}
// ================================================================

export async function deleteProductAction(
  input: z.infer<typeof getProductSchema>
) {
  and(eq(products.id, input.id), eq(products.artistID, input.artistId)),
    await db
      .delete(products)
      .where(
        and(eq(products.id, input.id), eq(products.artistID, input.artistId))
      )

  revalidatePath(`/dashboard/stores/${input.artistId}/products`)
}

export async function getNextProductIdAction(
  input: z.infer<typeof getProductSchema>
) {
  const product = await db.query.products.findFirst({
    where: and(eq(products.artistID, input.artistId), gt(products.id, input.id)),
    orderBy: asc(products.id),
  })

  if (!product) {
    throw new Error("Product not found.")
  }

  return product.id
}

export async function getPreviousProductIdAction(
  input: z.infer<typeof getProductSchema>
) {
  const product = await db.query.products.findFirst({
    where: and(eq(products.artistID, input.artistId), lt(products.id, input.id)),
    orderBy: desc(products.id),
  })

  if (!product) {
    throw new Error("Product not found.")
  }

  return product.id
}

// double check with charlie ======================================
export async function getTrendingProductsAction(input: {limit?: number, days?: number}) {
  const limit = input.limit ? input.limit : 10
  const days = input.days ? input.days : 7
  const start = new Date()
  start.setDate(start.getDate() - days)
  const end = new Date()

  const { items } = await db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(products)
      .limit(limit)
      .leftJoin(orders, eq(products.id, orders.productID))
      .where( between(orders.createdAt, start, end) )
      .groupBy(products.id)
      .orderBy( desc(sql<number>`count(${orders.id})`) )
    
    return { items }
  })

  return items
}

export async function getAllOwnersAction( input: z.infer<typeof getProductSchema> ) {
  const product = await db.query.products.findFirst({
    where: eq(products.id, input.id)
  })

  if(!product) {
    throw new Error("Product not found")
  }

  return product.owners
}
