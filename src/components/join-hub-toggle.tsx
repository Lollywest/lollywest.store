"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import * as React from "react"
import Image from "next/image"
import { joinArtistHubAction } from "src/app/_actions/store"
import { Badge } from "@/components/ui/badge"

interface JoinHubToggleProps {
    artistId: number,
    hubMember: boolean,
}


export function JoinHubToggle({ artistId, hubMember }: JoinHubToggleProps) {

    const [iconState, setIconState] = React.useState(hubMember ? "plus" : "minus")

    const handleToggle = async () => {
        await joinArtistHubAction({ artistId });
        setIconState("plus");
    }

    return (
        <Button
            variant="ghost"
            // size="icon"
            className="rounded-xl "
            onClick={() => { void handleToggle() }}
        >
            <span className={`flex rounded-xl rotate-0 scale-0 transition-all ${iconState === "plus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}>
                <Icons.users
                    // className={`mr-2 h-5 w-5  rotate-0 scale-0 transition-all ${iconState === "plus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                /> Join
            </span>
            {/* <Button variant="ghost" className={`rounded-xl rotate-0 scale-0 transition-all ${iconState === "plus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}>
                Join Hub
            </Button> */}
            {/* <Image
                src="/images/avatar/heart-check.svg"
                alt=""
                className={`absolute h-7 w-7 rotate-0 scale-0 transition-all ${iconState === "minus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                width={300}
                height={300}
            /> */}
            <span className={`flex absolute rounded-xl rotate-0 scale-0 transition-all ${iconState === "minus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}>
                <Icons.userCheck
                    // className={`mr-2 h-5 w-5  rotate-0 scale-0 transition-all ${iconState === "plus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                />Joined

            </span>
            {/* <Icons.add
                className={`absolute h-5 w-5 rotate-90 scale-0 transition-all ${iconState === "plus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                aria-hidden="true"
            /> */}
            <span className="sr-only">Toggle icon</span>
        </Button>
    )

}