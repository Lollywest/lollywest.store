"use client"

import * as React from "react"
import Slider from "react-slick"
import { type Artist, artists } from "@/db/schema"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import Image from "next/image"
import { db } from "@/db"
import { desc } from "drizzle-orm"
import { LobbyCommunityCard } from "@/components/lobby-community-card"
import { DiscoverCommunityCard } from "@/components/discover-communities-card"

interface DiscoverHubsSliderProps extends React.HTMLAttributes<HTMLDivElement> {
    discoverArtists: Artist[]
}

export function DiscoverHubsSlider({ discoverArtists }: DiscoverHubsSliderProps) {

    const [currentSlide, setCurrentSlide] = React.useState(0)

    const settings = {
        className: "center",
        centerMode: true,
        centerPadding: "60px",
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        beforeChange: (current: number, next: number) => setCurrentSlide(next),
        // afterChange: (current: number) => setCurrentSlide(current),
        responsive: [
            {
                breakpoint: 640,  // sm breakpoint, I think??
                settings: {
                    slidesToShow: 1,
                    centerPadding: "30px",
                }
            }
        ]
    }

    return (
        <div>
            {/* <h2>Single Item </h2> */}
            <Slider  {...settings}>
                {discoverArtists.map((artist, index) => (
                    // <div className="flex flex-grow p-2">
                    // <div className={` p-2 ${index === currentSlide ? 'scale-120' : ''}`}>
                    <div
                        key={artist.id}
                        className={` p-2 md:p-4 lg:p-6 transition-transform duration-500 delay-500 ${index === currentSlide ? 'scale-110 sm:scale-125 ' : ''}`}>

                        <DiscoverCommunityCard artist={artist} />
                    </div>
                ))}

            </Slider>
        </div>
    )

}
