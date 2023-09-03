import { redirect } from "next/navigation"
import { db } from "@/db"
import { artists } from "@/db/schema"
import { currentUser } from "@clerk/nextjs"
import { eq } from "drizzle-orm"

import { Header } from "@/components/header"
// import { StorePager } from "@/components/pagers/store-pager"
import { ArtistTabs } from "@/components/pagers/store-tabs"
import { Shell } from "@/components/shells/shell"

interface StoreLayoutProps {
  children: React.ReactNode
}

export default async function StoreLayout({
  children,
}: StoreLayoutProps) {

  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  // const allStores = await db
  //   .select({
  //     id: stores.id,
  //     name: stores.name,
  //   })
  //   .from(stores)
  //   .where(eq(stores.userId, user.id))

  // const store = allStores.find((store) => store.id === storeId)

  const artist = await db.query.artists.findFirst({
    where: eq(artists.userId, user.id)
  })

  if (!artist) {
    throw new Error("artist not found")
  }

  return (
    <Shell variant="sidebar" className="gap-4">
      <div className="flex items-center space-x-4">
        <Header title={artist.name} size="sm" className="flex-1" />
      </div>
      <div className="space-y-4 overflow-hidden">
        <ArtistTabs artistId={artist.id} />
        {children}
      </div>
    </Shell>
  )
}
