import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"

import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"
import { ManageSubscriptionsForm } from "@/components/forms/manage-subscriptions-form"
import { userPrivateMetadataSchema } from "@/lib/validations/auth"


export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Billing",
  description: "Manage your billing and subscription",
}

export default async function BillingPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }
  
  const userPrivateMetadata = userPrivateMetadataSchema.parse(
    user.privateMetadata
  )

  return (
    <Shell variant="sidebar" as="div">
      <Header
        title="Billing"
        description="Manage your billing and subscription"
        size="sm"
      />
      <ManageSubscriptionsForm
        userId={user.id}
        stripeCustomerId={userPrivateMetadata.stripeCustomerId}
      />
    </Shell>
  )
}
