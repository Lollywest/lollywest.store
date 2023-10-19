import { type Metadata } from "next"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { artists } from "@/db/schema"
import { env } from "@/env.mjs"
import { and, eq, not } from "drizzle-orm"
import { currentUser } from "@clerk/nextjs"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingButton } from "@/components/ui/loading-button"
import { Textarea } from "@/components/ui/textarea"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Manage Store",
  description: "Manage your store",
}


export default async function UpdateStorePage() {
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

  const artistId = artist.id

  async function updateStore(fd: FormData) {
    "use server"

    const name = fd.get("name") as string
    const description = fd.get("description") as string

    const artistWithSameName = await db.query.artists.findFirst({
      where: and(eq(artists.name, name), not(eq(artists.id, artistId))),
      columns: {
        id: true,
      },
    })

    if (artistWithSameName) {
      throw new Error("Name already taken")
    }

    await db
      .update(artists)
      .set({ name, description })
      .where(eq(artists.id, artistId))

    //check with charlie ==========================  
    revalidatePath(`/dashboard/stores/${artistId}`)
  }

  return (
    <div className="space-y-6">
      <Card
        as="section"
        id="update-store"
        aria-labelledby="update-store-heading"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Update your profile</CardTitle>
          <CardDescription>
            Update your profile name and description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            action={updateStore}
            className="grid w-full max-w-xl gap-5"
          >
            <fieldset className="grid gap-2.5">
              <Label htmlFor="update-store-name">Name</Label>
              <Input
                id="update-store-name"
                aria-describedby="update-store-name-description"
                name="name"
                required
                minLength={3}
                maxLength={50}
                placeholder="Type store name here."
                defaultValue={artist.name}
              />
            </fieldset>
            <fieldset className="grid gap-2.5">
              <Label htmlFor="update-store-description">Description</Label>
              <Textarea
                id="update-store-description"
                aria-describedby="update-store-description-description"
                name="description"
                minLength={3}
                maxLength={255}
                placeholder="Type store description here."
                defaultValue={artist.description ?? ""}
              />
            </fieldset>
            <div className="flex space-x-2">
              <LoadingButton>
                Update Profile
                <span className="sr-only">Update profile</span>
              </LoadingButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
