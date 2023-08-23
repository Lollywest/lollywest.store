import * as z from "zod"

export const artistSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(255).optional(),
})

export const getArtistSchema = z.object({
  id: z.number(),
  userId: z.string(),
})
