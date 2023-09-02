import type Stripe from "stripe"

import { stripe } from "@/lib/stripe"
import { db } from "@/db"
import { carts, orders } from "@/db/schema"
import { eq } from "drizzle-orm"
import { clerkClient } from "@clerk/nextjs"
import { env } from "@/env.mjs"
import { headers } from "next/headers"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") ?? ""

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    return new Response(
      `Webhook Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 400 }
    )
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (!session?.metadata?.userId) {
    return new Response(null, { status: 200 })
  }

  if (event.type === "checkout.session.completed") {
    console.log("1" + (session.customer as string))

    const user = await clerkClient.users.getUser(session.metadata.userId)

    // Create new order in DB
    await db.insert(orders).values({
      userId: user.id,
      username: user.username,
      name: user.firstName + " " + user.lastName,
      customerId: session.customer as string,
      price: session.amount_total?.toString(),
    })
    
    console.log("2" + (session.customer as string))

    if (session.metadata.cartId) {
      await db
      .update(carts)
      .set({
        items: [],
      })
      .where(eq(carts.id, Number(session.metadata.cartId)))
    }
    // Close cart and clear items
    await clerkClient.users.updateUserMetadata(session?.metadata?.userId, {
      privateMetadata: {
        stripeCustomerId: session.customer as string,
      },
    })

    console.log("3" + (session.customer as string))

    return new Response(null, { status: 200 })
  }
    // Update the users customer ID
}

