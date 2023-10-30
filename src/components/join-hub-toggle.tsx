"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import * as React from "react"
import Image from "next/image"
import { joinArtistHubAction } from "src/app/_actions/store"

interface JoinHubToggleProps {
    artistId: number,
    // hubMember: boolean,
}


export function JoinHubToggle({ artistId }: JoinHubToggleProps) {
    // Change 
    const [iconState, setIconState] = React.useState("minus");
    // const [iconState, setIconState] = React.useState( "plus" : "minus")

    const handleToggle = async () => {
        await joinArtistHubAction({ artistId });
        setIconState("plus");
    }

    return (
        <Button
            variant="ghost"
            // size="icon"
            className="rounded-xl p-1 "
            onClick={() => { void handleToggle() }}
        >
            {/* <Icons.heart
                className={`h-6 w-6 rotate-0 scale-0 transition-all ${iconState === "plus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                aria-hidden="true"
            /> */}
            <Button variant="secondary" className={`h-6 w-6 rotate-0 scale-0 transition-all ${iconState === "plus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}>
                Join Hub
            </Button>
            {/* <Image
                src="/images/avatar/heart-check.svg"
                alt=""
                className={`absolute h-7 w-7 rotate-0 scale-0 transition-all ${iconState === "minus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                width={300}
                height={300}
            /> */}
            <Button variant="secondary" className={`absolute h-7 w-7 rotate-0 scale-0 transition-all ${iconState === "minus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}>
                <Image
                    className="mr-2 h-6 w-6"
                    src="/images/avatar/verified1.svg"
                    alt=""
                    height={800}
                    width={800}
                />Joined Hub

            </Button>
            {/* <Icons.add
                className={`absolute h-5 w-5 rotate-90 scale-0 transition-all ${iconState === "plus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                aria-hidden="true"
            /> */}
            <span className="sr-only">Toggle icon</span>
        </Button>
    )

}