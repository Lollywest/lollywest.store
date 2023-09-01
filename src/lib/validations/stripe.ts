import * as z from "zod"
import { cartLineItemSchema } from "@/lib/validations/cart"

export const manageSubscriptionSchema = z.object({
  userId: z.string(),
  stripeCustomerId: z.string().optional().nullable(),
})

export const createCheckoutSessionSchema = z.object({
  userId: z.string(),
  stripeCustomerId: z.string().optional().nullable(),
  items: z.array(cartLineItemSchema),
})

export const createAccountLinkSchema = z.object({
  artistId: z.number(),
  userId: z.string().optional(),
})
