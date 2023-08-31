"use server"

import { db } from "@/db"
import { contacts } from "@/db/schema"
import { contactSchema } from "@/lib/validations/contact"
import * as z from "zod"

export async function addContactAction(input: z.infer<typeof contactSchema>) {
    await db.insert(contacts).values(input)
}