import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { env } from "@/env.mjs"
import Mux from "@mux/mux-node"

const { Webhooks } = Mux
const { Video } = new Mux()

interface ReadyEvent {
    type: string,
    object: {
        type: string,
        id: string,
    }
}

export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get("mux-signature") ?? ""

    const valid = Webhooks.verifyHeader(
        body,
        signature,
        env.MUX_WEBHOOK_SECRET
    )

    const event: ReadyEvent = JSON.parse(body) as ReadyEvent

    if (valid && event.type === "video.asset.ready") {
        const post = await db.query.posts.findFirst({
            where: eq(posts.videoAssetId, event.object.id)
        })
        if(!post) {
            return new Response(
                `Webhook Error: could not find post with assetId ${event.object.id}
                }`,
                { status: 400 }
              )
        }

        const asset = await Video.Assets.get(event.object.id)

        if(asset.playback_ids && asset.playback_ids[0]) {
            post.videoPlaybackId = asset.playback_ids[0].id
            void db.update(posts).set(post).where(eq(posts.id, post.id))
        }
    }

    return new Response(null, { status: 200 })
}