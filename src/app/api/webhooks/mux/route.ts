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

// TODO: double check this with charlie
export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get("mux-signature") ?? ""

    let valid: boolean

    try {
        valid = Webhooks.verifyHeader(
            body,
            signature,
            env.MUX_WEBHOOK_SECRET
        )
    } catch (e) {
        return new Response(
            `Webhook Error: ${e instanceof Error ? e.message : "Unknown error"
            }`,
            { status: 400 }
        )
    }

    if (!valid) {
        return new Response("invalid mux signature", { status: 400 })
    }

    const event: ReadyEvent = JSON.parse(body) as ReadyEvent

    if (event.type === "video.asset.ready") {
        const post = await db.query.posts.findFirst({
            where: eq(posts.videoAssetId, event.object.id)
        })
        if (!post) {
            return new Response(
                `Webhook Error: could not find post with assetId ${event.object.id}
                }`,
                { status: 400 }
            )
        }

        const asset = await Video.Assets.get(event.object.id)

        if (asset.playback_ids && asset.playback_ids[0]) {
            post.videoPlaybackId = asset.playback_ids[0].id
            await db.update(posts).set(post).where(eq(posts.id, post.id))
            return new Response(null, { status: 200 })
        } else {
            return new Response(
                `Webhook Error: asset: ${event.object.id} has no playbackId
                }`,
                { status: 400 }
            )
        }
    }

    return new Response(event.type, { status: 200 })
}