"use server"

import Mux from "@mux/mux-node"

const { Video } = new Mux()

export async function getUploadUrl() {
    console.log("getUploadUrl")
    const upload = await Video.Uploads.create({
        new_asset_settings: { playback_policy: 'public' },
        cors_origin: "https://lollywest.com"
    })
    console.log("gotUploadUrl")
    return {
        url: upload.url,
        id: upload.id,
    }
}