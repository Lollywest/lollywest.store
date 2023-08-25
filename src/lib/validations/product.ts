import { products } from "@/db/schema"
import * as z from "zod"

export const productSchema = z.object({
  artistId: z.number(),
  name: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  description: z.string().optional(),
  category: z
    .enum(products.category.enumValues, {
      required_error: "Must be a valid category",
    })
    .default(products.category.enumValues[2]),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Must be a valid price",
  }),
  perks: z
    .unknown()
    .refine((val) => {
      if(!Array.isArray(val)) return false
      if(val.some((perk) => !(perk instanceof String))) return false
      return true
    }, "Must be a string array")
    .optional()
    .nullable()
    .default(null),
  decksLeft: z.number().optional().default(0),
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
  owners: z
    .unknown()
    .refine((val) => {
      if(!Array.isArray(val)) return false
      if(val.some((owner) => !(owner instanceof Number))) return false
      return true
    }, "Must be a number array")
    .optional()
    .nullable()
    .default(null)
})

export const filterProductsSchema = z.object({
  query: z.string(),
})

export const getProductSchema = z.object({
  id: z.number(),
  artistId: z.number(),
})

export const getProductsSchema = z.object({
  limit: z.number().default(10),
  offset: z.number().default(0),
  categories: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
  sort: z
    .string()
    .regex(/^\w+.(asc|desc)$/)
    .optional()
    .nullable(),
  price_range: z
    .string()
    .regex(/^\d+-\d+$/)
    .optional()
    .nullable(),
  artist_ids: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
})
