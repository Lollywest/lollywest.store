"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { checkUsernameAction } from "@/app/_actions/wallet"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shells/shell"

export default function VerifyPage() {
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
        <Shell className="max-w-lg justify-center">
            <Icons.spinner
                className="h-20 w-20 animate-spin"
                aria-hidden="true"
            />
        </Shell>
    )
}