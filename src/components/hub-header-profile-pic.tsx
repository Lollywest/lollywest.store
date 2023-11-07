"use client"


import React from "react"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { products, upcoming, artists, userStats, type Artist } from "@/db/schema"
import { Icons } from "@/components/icons"

import Image from "next/image"

interface HubProfilePicProps extends React.HTMLAttributes<HTMLDivElement> {
    artist: Artist
}

export function HubHeaderProfilePic({ artist }: HubProfilePicProps) {

    return (
        <div className="flex flex-col items-center">

            <div className="relative">



                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-2 border-white">
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
