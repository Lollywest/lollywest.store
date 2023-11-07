"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { catchError } from "@/lib/utils"
import { subscribeToWrapAction } from "@/app/_actions/stripe"
import { useRouter } from "next/navigation"
import { JoinPremiumToggle } from "@/components/join-premium-toggle"
import Image from "next/image"

interface AccessPassSubscribeButtonProps {
    productId: number
    artistId: number
    isPremiumMember: boolean
}

export function AccessPassSubscribeButton({ productId, artistId, isPremiumMember }: AccessPassSubscribeButtonProps) {
    const [isPending, startTransition] = React.useTransition()
    const router = useRouter()
    const [iconState, setIconState] = React.useState(isPremiumMember ? "plus" : "minus")

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        startTransition(async () => {
            try {
                const result = await subscribeToWrapAction(productId)

                if (result === "signin") {
                    router.push("/signin")
                    return
                }

                if (result) {
                    window.location.href = result.url ?? "/wrap/" + productId
                }
            } catch (err) {
                catchError(err)
            }
        })

        setIconState("plus")
    }

    return (
        // <form className="w-full flex items-center justify-center" onSubmit={(e) => onSubmit(e)}>
        <form className="items-center justify-center" onSubmit={(e) => onSubmit(e)}>
            <Button
                aria-label="Subscribe"
                size="sm"
                // className="w-2/3 rounded-xl"
                variant="ghost"
                className="rounded-xl p-1 m-2"
                disabled={isPending}
            >
                {isPending && (
                    <Icons.spinner
                        className="mr-2 h-4 w-4 animate-spin"
                        aria-hidden="true"
                    />
                )}
                {/* Become a Member Now */}
                {!isPending && (
                    <span className={`flex rounded-xl rotate-0 scale-0 transition-all ${iconState === "plus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}>

                        <Icons.badgeCheck
                            // className={`mr-2 h-5 w-5  rotate-0 scale-0 transition-all ${iconState === "plus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                        /> Access Pass
                    </span>
                )}
                {!isPending && (
                    <span className={`flex items-center absolute rounded-xl rotate-0 scale-0 transition-all ${iconState === "minus" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}>
                        <Image
                            className="mr-2 h-6 w-6"
                            src="/images/avatar/verified1.svg"
                            alt=""
                            height={800}
                            width={800}
                        />Access Pass

                    </span>
                )}

            </Button>

        </form>
    )
}