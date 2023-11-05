"use client"

import ReactHlsPlayer from "@/components/hls-player"

interface videoPlayerProps {
    playbackId: string
}

export default function VideoPlayer({ playbackId }: videoPlayerProps) {
    return (
        <ReactHlsPlayer
            className="flex-1 w-full md:w-1/2"
            src={`https://stream.mux.com/${playbackId}.m3u8`}
            autoPlay={false}
            controls={true}
        />
    )
}