import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AddProductForm } from "@/components/forms/add-product-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "New Product",
  description: "Add a new product",
}

interface NewProductPageProps {
  params: {
    artistId: string
  }
}

export default async function NewProductPage({ params }: NewProductPageProps) {
  const artistId = Number(params.artistId)

  const user = await currentUser()

  if (!user) {
    redirect("/sigin")
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Add product</CardTitle>
        <CardDescription>Add a new product to your store</CardDescription>
      </CardHeader>
      <CardContent>
        <AddProductForm artistId={artistId} />
      </CardContent>
    </Card>
  )
}
