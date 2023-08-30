import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { artists } from "@/db/schema"
import { env } from "@/env.mjs"
import { eq } from "drizzle-orm"
import { currentUser } from "@clerk/nextjs"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Orders",
  description: "Manage your orders",
}

export default async function OrdersPage() {
  const user = await currentUser()

  if(!user) {
    throw new Error("user not found")
  }

  const artist = await db.query.artists.findFirst({
    where: eq(artists.userId, user.id)
  })

  if (!artist) {
    throw new Error("artist not found")
  }

  // TODO ======================
  return <div>Orders Table</div>
}
