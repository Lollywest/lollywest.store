"use server"

import { cookies } from "next/headers"
import { db } from "@/db"
import { artists, payments, products } from "@/db/schema"
import { clerkClient } from "@clerk/nextjs"
import { eq, and } from "drizzle-orm"
import { type z } from "zod"

import { stripe } from "@/lib/stripe"
import { absoluteUrl } from "@/lib/utils"
import type {
  createAccountLinkSchema,
  createCheckoutSessionSchema,
  manageSubscriptionSchema,
} from "@/lib/validations/stripe"
import { currentUser } from "@clerk/nextjs"
import { userPrivateMetadataSchema } from "@/lib/validations/auth"

// For managing stripe subscriptions for a user
export async function manageSubscriptionAction(
  input: z.infer<typeof manageSubscriptionSchema>
) {
  const billingUrl = absoluteUrl("/dashboard/billing")

  const user = await clerkClient.users.getUser(input.userId)

  if (!user) {
    throw new Error("User not found.")
  }

  // If the user is already subscribed to a plan, we redirect them to the Stripe billing portal
  if (input.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: input.stripeCustomerId,
      return_url: billingUrl,
    })

    return {
      url: stripeSession.url,
    }
  }
}

export async function createCheckoutSessionAction(
  input: z.infer<typeof createCheckoutSessionSchema>
) {
  const user = await clerkClient.users.getUser(input.userId)
  const cartId = cookies().get("cartId")?.value

  if (!user) {
    throw new Error("User not found.")
  }

  let prods : string = ""
  for(const item of input.items) {
    prods = prods + String(item.id) + "." + String(item.quantity) + " "
  }
  prods = prods.slice(0, -1)

  const billingUrl = absoluteUrl("/dashboard/billing")

  // Check if any item has the category "wrap"
  const isSubscription = input.items.some((item) => item.category === "wrap")

  if (isSubscription) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: input.items.map((item) => ({
        price: item.stripePriceId ? item.stripePriceId : undefined,
        quantity: item.quantity,
      })),
      success_url: billingUrl,
      cancel_url: billingUrl,
      metadata: {
        userId: input.userId,
        username: user.username,
        cartId: cartId ? cartId : null,
        email: user.emailAddresses[0]
          ? user.emailAddresses[0].emailAddress
          : null,
        items: prods
      },
      mode: "subscription",
      customer: input.stripeCustomerId ? input.stripeCustomerId : undefined,
      billing_address_collection: "auto",
    })
    return session
  } else {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: input.items.map((item) => ({
        price: item.stripePriceId ? item.stripePriceId : undefined,
        quantity: item.quantity,
      })),
      success_url: billingUrl,
      cancel_url: billingUrl,
      metadata: {
        userId: input.userId,
        username: user.username,
        cartId: cartId ? cartId : null,
        email: user.emailAddresses[0]
          ? user.emailAddresses[0].emailAddress
          : null,
        items: prods
        
      },
      mode: "payment",
      ...(input.stripeCustomerId
        ? { customer: input.stripeCustomerId }
        : { customer_creation: "always" }),
    })
    return session
  }
}

export async function checkStripeConnectionAction(
  input: z.infer<typeof createAccountLinkSchema>
) {
  const artist = await db.query.artists.findFirst({
    where: eq(artists.id, input.artistId),
  })

  if (!artist) return false

  const payment = await db.query.payments.findFirst({
    where: eq(payments.artistID, input.artistId),
  })

  if (!payment) return false

  if (!payment.stripeAccountId) return false

  const account = await stripe.accounts.retrieve(payment.stripeAccountId)

  if (!account) return false

  return account.details_submitted && payment.detailsSubmitted ? true : false
}

// For connecting a Stripe account to a store
export async function createAccountLinkAction(
  input: z.infer<typeof createAccountLinkSchema>
) {
  //  Check if the store is already connected to Stripe
  const store = await db.query.artists.findFirst({
    where: eq(artists.id, input.artistId),
  })

  if (!store) {
    throw new Error("Store not found.")
  }

  // TODO: Check if stripeAccountId is available on the store

  const payment = await db.query.payments.findFirst({
    where: eq(payments.artistID, input.artistId),
  })

  if (payment?.detailsSubmitted) {
    throw new Error("Store already connected to Stripe.")
  }

  let stripeAccountId = ""
  if (payment?.stripeAccountId) {
    stripeAccountId = payment.stripeAccountId
  } else {
    const account = await stripe.accounts.create({
      type: "standard",
    })

    if (!account) {
      throw new Error("Error creating Stripe account.")
    }

    stripeAccountId = account.id

    await db.update(payments).set({
      artistID: input.artistId,
      stripeAccountId,
    })
  }

  const accountLink = await stripe.accountLinks.create({
    account: stripeAccountId,
    refresh_url: absoluteUrl("/dashboard/stripe"),
    return_url: absoluteUrl("/dashboard/stripe"),
    type: "account_onboarding",
  })

  if (!accountLink || !accountLink.url) {
    throw new Error("Error creating Stripe account link, please try again.")
  }

  return {
    url: accountLink.url,
  }
}

export async function subscribeToWrapAction(productId: number) {
  const user = await currentUser()
  if(!user) {
    return "signin"
  }

  const userPrivateMetadata = userPrivateMetadataSchema.parse(
    user.privateMetadata
  )
  const stripeCustomerId = userPrivateMetadata.stripeCustomerId || undefined

  const item = await db.query.products.findFirst({
    where: eq(products.id, productId)
  })
  if(!item) {
    throw new Error("Product not found!")
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price: item.stripePriceId ? item.stripePriceId : undefined,
      quantity: 1,
    }],
    success_url: absoluteUrl("/wrap/" + productId),
    cancel_url: absoluteUrl("/wrap/" + productId),
    metadata: {
      userId: user.id,
      username: user.username,
      cartId: null,
      email: user.emailAddresses[0]
        ? user.emailAddresses[0].emailAddress
        : null,
      items: productId + ".1"
    },
    mode: "subscription",
    customer: stripeCustomerId ? stripeCustomerId : undefined,
    billing_address_collection: "auto",
  })
  return session
}

export async function subscribeToAccessPassAction(artistId: number) {
  const user = await currentUser()
  if(!user) {
    return "signin"
  }

  const userPrivateMetadata = userPrivateMetadataSchema.parse(
    user.privateMetadata
  )
  const stripeCustomerId = userPrivateMetadata.stripeCustomerId || undefined

  const item = await db.query.products.findFirst({
    where: and(eq(products.category, "wrap"), eq(products.artistID, artistId))
  })
  if(!item) {
    throw new Error("Artist Access Pass not found")
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price: item.stripePriceId ? item.stripePriceId : undefined,
      quantity: 1,
    }],
    success_url: absoluteUrl("/artist-premium/" + artistId),
    cancel_url: absoluteUrl("/artist-premium/" + artistId),
    metadata: {
      userId: user.id,
      username: user.username,
      cartId: null,
      email: user.emailAddresses[0]
        ? user.emailAddresses[0].emailAddress
        : null,
      items: item.id + ".1"
    },
    mode: "subscription",
    customer: stripeCustomerId ? stripeCustomerId : undefined,
    billing_address_collection: "auto",
  })
  return session
}