import { type Product } from "@/db/schema"
import { type FileWithPath } from "react-dropzone"
import * as z from "zod"

import { type userPrivateMetadataSchema } from "@/lib/validations/auth"
import type { cartItemSchema, checkoutItemSchema, stripeItemSchema } from "@/lib/validations/cart"
import { postSchema } from "@/lib/validations/post"
import { type Icons } from "@/components/icons"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export type UserRole = z.infer<typeof userPrivateMetadataSchema.shape.role>

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export type FileWithPreview = FileWithPath & {
  preview: string
}

export interface StoredFile {
  id: string
  name: string
  url: string
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData
  title: string
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[]
}

export type CartItem = z.infer<typeof cartItemSchema>

export type StripeItem = z.infer<typeof stripeItemSchema>

export type CheckoutItem = z.infer<typeof checkoutItemSchema>

export interface CartLineItem
  extends Pick<
    Product,
    "id" | 
    "name" | 
    "price" | 
    "artistID" |
    "images" | 
    "category" |
    "stripePriceId"
  > {
  quantity?: number
  artistName: string | null
}

export interface SubscriptionPlan {
  id: "basic" | "standard" | "pro"
  name: string
  description: string
  features: string[]
  stripePriceId: string
  price: number
  isCanceled?: boolean
}

export type NewPost = z.infer<typeof postSchema>


export const HubJoinInfoSchema = z.object({
  artistId: z.number(),
  date: z.date(),
})

export type HubJoinInfo = z.infer<typeof HubJoinInfoSchema>

export const SponsorInfoSchema = z.object({
  artistId: z.number(),
  amount: z.number(),
  date: z.date(),
})

export type SponsorInfo = z.infer<typeof SponsorInfoSchema>

export const GetPostReturnSchema = z.object({
  id: z.number(),
  user: z.string(),
  isArtist: z.boolean().default(false),
  artistId: z.number(),
  title: z.string(),
  message: z.string(),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, "Must be an array of File")
    .optional()
    .nullable()
    .default(null),
  likers: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((str) => !(str instanceof String))) return false
      return true
    }, "Must be an array of Strings")
    .optional()
    .nullable()
    .default(null),
  numLikes: z.number().default(0),
  numComments: z.number().default(0),
  isEvent: z.boolean().default(false),
  eventTime: z.date().nullable(),
  isPremium: z.boolean().default(false),
  createdAt: z.date().nullable(),
  points: z.number(),
  username: z.string(),
  image: z.string(),
  likedByUser: z.boolean().default(false),
})

export type GetPostReturn = z.infer<typeof GetPostReturnSchema>

export const GetCommentReturnSchema = z.object({
  id: z.number(),
  user: z.string(),
  postId: z.number(),
  replyingTo: z.number().optional().nullable().default(null),
  numReplies: z.number().default(0),
  message: z.string(),
  likers: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((str) => !(str instanceof String))) return false
      return true
    }, "Must be an array of Strings")
    .optional()
    .nullable()
    .default(null),
  createdAt: z.date().nullable(),
  points: z.number().default(0),
  username: z.string(),
  image: z.string(),
  likedByUser: z.boolean().default(false),
})

export type GetCommentReturn = z.infer<typeof GetCommentReturnSchema>