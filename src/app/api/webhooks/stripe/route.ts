import type Stripe from "stripe"

import { stripe } from "@/lib/stripe"
import { db } from "@/db"
import { carts, orders } from "@/db/schema"
import { eq } from "drizzle-orm"
import { clerkClient } from "@clerk/nextjs"
import { env } from "@/env.mjs"
import { headers } from "next/headers"
import { StripeItem } from "@/types"

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

    const user = await clerkClient.users.getUser(session.metadata.userId)

    const prods = session.metadata.items
    const items = []
    for(const item of prods!.split(" ")) {
      const arr = item.split(".")
      const row : StripeItem = {
        id: Number(arr[0]),
        quantity: Number(arr[1])
      }
      items.push(row)
    }


    // Create new order in DB
    await db.insert(orders).values({
      userId: user.id,
      username: user.username,
      name: user.firstName + " " + user.lastName,
      customerId: typeof session.customer !== 'string' ? session.customer?.id : session.customer,
      price: session.amount_total?.toString(),
      products: items,
    })

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
        stripeCustomerId: typeof session.customer !== 'string' ? session.customer?.id : session.customer,
      },
    })

    // Send Slack notification
    const customerId = typeof session.customer !== 'string' ? session.customer?.id : session.customer;
    const userId = session.metadata.userId;
    const email = session.metadata.email;
    const message = `Checkout session completed! Customer ID: ${customerId}, User ID: ${userId}, Email: ${email}`;
    await sendSlackNotification(message);

    return new Response(null, { status: 200 })
  }
}

const sendSlackNotification = async (message: string) => { 
  const webhook = env.SLACK_WEBHOOK_URL
  const body = JSON.stringify({ text: message })
  const response = await fetch(webhook, {
    method: "POST",
    body,
  })
  return response
}