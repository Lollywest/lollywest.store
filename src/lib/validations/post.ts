import { posts } from "@/db/schema";
import * as z from "zod"

export const postSchema = z.object({
    productId: z.number(),
    artistId: z.number(),
    title: z.string(),
    message: z.string(),
    users: z
        .unknown()
        .refine((val) => {
            if(!Array.isArray(val)) return false
            if(val.some((user) => !(user instanceof String))) return false
            return true
        }, "Must be a string array")
        .optional()
        .nullable()
        .default(null)
})