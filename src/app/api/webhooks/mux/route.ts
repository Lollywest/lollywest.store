import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
    const body = await req.text()
    console.log(body)
}