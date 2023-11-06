"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { Icons } from "@/components/icons"
import * as React from "react"
import Image from "next/image"

// change
import { joinArtistHubAction } from "src/app/_actions/store"

interface JoinPremiumToggleProps {
    artistId: number,
    premiumMember: boolean,
}


export function JoinPremiumToggle({ artistId, premiumMember }: JoinPremiumToggleProps) {

    const [iconState, setIconState] = React.useState(premiumMember ? "plus" : "minus")

    const handleToggle = async () => {
        // change
        await joinArtistHubAction({ artistId })
        setIconState("plus")
    }

    return (
        <Button
            variant="ghost"
            // size="icon"
            className="rounded-xl p-1 m-2 "
            onClick={() => { void handleToggle() }}
        >
            {/* <Icons.heart
                className={`h-6 w-6 rotate-0 scale-0 transition-all ${iconState === "plus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                aria-hidden="true"
            /> */}
            <span className={`flex rounded-xl rotate-0 scale-0 transition-all ${iconState === "plus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}>

                <Icons.badgeCheck
                    // className={`mr-2 h-5 w-5  rotate-0 scale-0 transition-all ${iconState === "plus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                /> Access Pass
            </span>
            {/* <Image
                src="/images/avatar/heart-check.svg"
                alt=""
                className={`absolute h-7 w-7 rotate-0 scale-0 transition-all ${iconState === "minus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                width={300}
                height={300}
            /> */}
            <span className={`flex items-center absolute rounded-xl rotate-0 scale-0 transition-all ${iconState === "minus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}>
                <Image
                    className="mr-2 h-6 w-6"
                    src="/images/avatar/verified1.svg"
                    alt=""
                    height={800}
                    width={800}
                />Access Pass

            </span>
            {/* <Icons.add
                className={`absolute h-5 w-5 rotate-90 scale-0 transition-all ${iconState === "plus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                aria-hidden="true"
            /> */}
            <span className="sr-only">Toggle icon</span>
        </Button>
    )

}