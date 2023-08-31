import { contacts } from "@/db/schema"
import * as z from "zod"

export const contactSchema = z.object({
    category: z
    .enum(contacts.category.enumValues, {
      required_error: "Must be a valid category",
    })
    .default(contacts.category.enumValues[0]),
    contactInfo: z.string(),
    message: z.string()
})