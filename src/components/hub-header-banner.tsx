"use client"


import React from "react"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { products, upcoming, artists, userStats, type Artist } from "@/db/schema"
import { Icons } from "@/components/icons"

import Image from "next/image"

interface HubHeaderBannerProps extends React.HTMLAttributes<HTMLDivElement> {
    artist: Artist
}

export function HubHeaderBanner({ artist }: HubHeaderBannerProps) {

    return (
        <div className="flex flex-col items-center ">

            <div className="shadow-lg shadow-[#8ea2f0]/25 m-1 rounded-xl">
                {artist.images[1] !== null ? (
                    // <AspectRatio ratio={3 / 1}>
                    <Image
                        className="rounded-xl"
                        src={artist.images[1]!.url}
                        alt=""
                        height={500}
                        width={1500}
                    />
                    // </AspectRatio>
                ) :

                    <Image
                        className="rounded-xl"
                        src="/images/DeleteLater-Example-Banner.png"
                        alt=""
                        height={500}
                        width={1500}
                    />

                }


                {/* <div className="absolute -bottom-16 left-1/2 transform w-1/4 -translate-x-1/2 rounded-full overflow-hidden border-2 border-white"> */}
                <div className="absolute bottom-0 left-1/2 transform w-[12%] sm:w-[10%] -translate-x-1/2 rounded-xl overflow-hidden border border-white mb-2 shadow-md">

                    {artist.images[0] !== null ? (
                        <Image
                            className="rounded-xl"
                            src={artist.images[0]!.url}
                            alt=""
                            height={200}
                            width={200}
                        />
                    ) :
                        <div
                            aria-label="Image Placeholder"
                            role="img"
                            aria-roledescription="placeholder"
                            className="flex aspect-square h-full w-full flex-1 items-center justify-center bg-secondary"
                        >
                            <Icons.placeholder
                                className="h-9 w-9 text-muted-foreground"
                                aria-hidden="true"
                            />
                        </div>
                    }

                </div>
            </div>
        </div>
    )

}
