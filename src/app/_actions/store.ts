"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { products, artists, type Artist } from "@/db/schema"
import { and, asc, desc, eq, gt, lt, sql } from "drizzle-orm"
import { type z } from "zod"
import type { StoredFile } from "@/types"
import { currentUser } from "@clerk/nextjs"

import { slugify } from "@/lib/utils"
import type { getArtistSchema, artistSchema } from "@/lib/validations/artist"

export async function getStoresAction(input: {
  limit?: number
  offset?: number
  sort?: `${keyof Artist | "productCount"}.${"asc" | "desc"}`
  userId?: string
}) {
  const limit = input.limit ?? 10
  const offset = input.offset ?? 0
  const [column, order] =
    (input.sort?.split("-") as [
      keyof Artist | undefined,
      "asc" | "desc" | undefined,
    ]) ?? []

  const { items, total } = await db.transaction(async (tx) => {
    const items = await tx
      .select({
        id: artists.id,
        name: artists.name,
        productCount: sql<number>`count(${products.id})`,
      })
      .from(artists)
      .limit(limit)
      .offset(offset)
      .leftJoin(products, eq(artists.id, products.artistID))
      .where(input.userId ? eq(artists.userId, input.userId) : undefined)
      .groupBy(artists.id)
      .orderBy(
        input.sort === "productCount.asc"
          ? asc(sql<number>`count(${products.id})`)
          : input.sort === "productCount.desc"
          ? desc(sql<number>`count(${products.id})`)
          : column && column in artists
          ? order === "asc"
            ? asc(artists[column])
            : desc(artists[column])
          : desc(artists.createdAt) //////not sure if needed =====================================
      )

    const total = await tx
      .select({
        count: sql<number>`count(${artists.id})`,
      })
      .from(artists)

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

// not sure if we need this =================================
export async function addArtistAction(
  input: z.infer<typeof artistSchema> & { userId: string }
) {
  const artistWithSameName = await db.query.artists.findFirst({
    where: eq(artists.name, input.name),
  })

  if (artistWithSameName) {
    throw new Error("Artist name already taken.")
  }

  await db.insert(artists).values({
    name: input.name,
    description: input.description,
    userId: input.userId,
    slug: slugify(input.name),
  })

  revalidatePath("/dashboard/stores")
}

export async function getNextArtistIdAction(
  input: z.infer<typeof getArtistSchema>
) {
  if (typeof input.id !== "number" || typeof input.userId !== "string") {
    throw new Error("Invalid input.")
  }

  const nextArtist = await db.query.artists.findFirst({
    where: and(eq(artists.userId, input.userId), gt(artists.id, input.id)),
    orderBy: asc(artists.id),
  })

  if (!nextArtist) {
    const firstArtist = await db.query.artists.findFirst({
      where: eq(artists.userId, input.userId),
      orderBy: asc(artists.id),
    })

    if (!firstArtist) {
      throw new Error("Artist not found.")
    }

    return firstArtist.id
  }

  return nextArtist.id
}

export async function getPreviousArtistIdAction(
  input: z.infer<typeof getArtistSchema>
) {
  if (typeof input.id !== "number" || typeof input.userId !== "string") {
    throw new Error("Invalid input.")
  }

  const previousArtist = await db.query.artists.findFirst({
    where: and(eq(artists.userId, input.userId), lt(artists.id, input.id)),
    orderBy: desc(artists.id),
  })

  if (!previousArtist) {
    const lastArtist = await db.query.artists.findFirst({
      where: eq(artists.userId, input.userId),
      orderBy: desc(artists.id),
    })

    if (!lastArtist) {
      throw new Error("Artist not found.")
    }

    return lastArtist.id
  }

  return previousArtist.id
}

export async function getArtistByNameAction(input: {
  name: string
}) {
  const artist = await db.query.artists.findFirst({
    where: eq(artists.name, input.name)
  })

  if(!artist) {
    return
  }

  return artist.id
}

export async function updateArtistImagesAction(input: {
  image1: StoredFile[] | null,
  image2: StoredFile[] | null
}) {
  const user = await currentUser()
  if(!user) {
    throw new Error("user not found")
  }

  const artist = await db.query.artists.findFirst({
    where: eq(artists.userId, user.id)
  })
  if(!artist) {
    throw new Error("artist not found")
  }

  if(!artist.images?.length) {
    artist.images = input.image1 ? (input.image2 ? input.image1.concat(input.image2) : input.image1) : (input.image2 ? input.image2 : null)
    await db.update(artists).set(artist).where(eq(artists.userId, user.id))
    return
  }

  if(input.image1) {
    artist.images[0] = input.image1[0]!
  }

  if(input.image2) {
    if(artist.images.length > 1) {
      artist.images[1] = input.image2[0]!
    } else {
      artist.images = artist.images.concat(input.image2)
    }
  }

  await db.update(artists).set(artist).where(eq(artists.userId, user.id))
}