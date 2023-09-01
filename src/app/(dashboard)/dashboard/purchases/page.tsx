import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"
import { PurchasedProductCard } from "@/components/purchased-product-card"
import { getProductsAction } from "@/app/_actions/wallet"

import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Purchases",
  description: "Manage your purchases",
}

export default async function PurchasesPage() {

  const allProducts = await getProductsAction()

  return (
    <Shell variant="sidebar">
      <Header
        title="Purchases"
        description="View your purchases."
        size="sm"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allProducts.map((product) => (
          <PurchasedProductCard key={product.id} product={product} />
        ))}
      </div>
    </Shell>
  )
}
