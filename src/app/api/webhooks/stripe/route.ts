import type Stripe from "stripe"

import { stripe } from "@/lib/stripe"
import { db } from "@/db"
import { carts, orders, products, artists, userStats } from "@/db/schema"
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
      `Webhook Error: ${error instanceof Error ? error.message : "Unknown error"
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
    for (const item of prods!.split(" ")) {
      const arr = item.split(".")
      const row: StripeItem = {
        id: Number(arr[0]),
        quantity: Number(arr[1])
      }
      items.push(row)

      const prod = await db.query.products.findFirst({
        where: eq(products.id, row.id)
      })
      if (prod) {
        if (prod.owners) {
          prod.owners.push(user.id)
        } else {
          prod.owners = [user.id]
        }
        await db.update(products).set(prod).where(eq(products.id, prod.id))

        if (prod.category === "wrap") {
          await db.transaction(async (tx) => {
            const artist = await tx.query.artists.findFirst({
              where: eq(artists.id, prod.artistID)
            })
            if (!artist) { throw new Error("artist not found") }

            if (!artist.premiumHubMembers) {
              artist.premiumHubMembers = [ user.id ]
            } else {
              artist.premiumHubMembers.push(user.id)
            }

            await tx.update(artists).set(artist).where(eq(artists.id, artist.id))

            const userInfo = await tx.query.userStats.findFirst({
              where: eq(userStats.userId, user.id)
            })
            if (!userInfo) {
              throw new Error("user info not found")
            }

            if (!userInfo.premiumHubs) {
              userInfo.premiumHubs = [ { date: new Date(), artistId: prod.artistID } ]
            } else {
              userInfo.premiumHubs.push( { date: new Date(), artistId: prod.artistID } )
            }

            await tx.update(userStats).set(userInfo).where(eq(userStats.userId, userInfo.userId))
          })
        }
      }
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
    headers: { "Content-Type": "application/json" },
    body,
  })
  return response
}
