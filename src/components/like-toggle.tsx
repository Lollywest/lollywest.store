"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import * as React from "react"
import Image from "next/image"

export function LikeIconToggle() {
    // const [iconState, setIconState] = React.useState("plus"); 
    const [iconState, setIconState] = React.useState("plus")

    return (
        <Button
            variant="ghost"
            size="icon"
            className="rounded-xl p-1 "
            onClick={() => setIconState(iconState === "plus" ? "minus" : "plus")}
        >
            <Icons.heart
                className={`h-7 w-7 rotate-0 scale-0 transition-all ${iconState === "minus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                aria-hidden="true"
            />
            <Image
                src="/images/avatar/heart-check.svg"
                alt=""
                className={`absolute h-8 w-8 rotate-0 scale-0 transition-all ${iconState === "plus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                width={300}
                height={300}
            />
            {/* <Icons.add
                className={`absolute h-5 w-5 rotate-90 scale-0 transition-all ${iconState === "plus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                aria-hidden="true"
            /> */}
            <span className="sr-only">Toggle icon</span>
        </Button>
    )

}