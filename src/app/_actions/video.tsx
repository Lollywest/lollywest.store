"use server"

import Mux from "@mux/mux-node"

const { Video } = new Mux()

export async function getUploadUrl() {
    const upload = await Video.Uploads.create({
        new_asset_settings: { playback_policy: 'public' },
        cors_origin: "https://lollywest.com"
    })

    return {
        url: upload.url,
        id: upload.id,
    }
}

export async function getUploadAsset(input: {
    uploadId: string,
}) {
    const upload = await Video.Uploads.get(input.uploadId)

    if(upload.status === "asset_created") {
        return (upload.asset_id!)
    }

    return ("")
}