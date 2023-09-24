"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { checkUsernameAction } from "@/app/_actions/wallet"
import { Icons } from "@/components/icons"

export default function UsernamePage() {
    const router = useRouter()

    React.useEffect(() => {
        const checkUsername = async () => {
            const hasUsername = await checkUsernameAction()

            if (hasUsername) {
                router.push("/")
            } else {
                router.push("/username")
            }
        }

        checkUsername().catch(console.error)
    })

    return (
        <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
        />
    )
}