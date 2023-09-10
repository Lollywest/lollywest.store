"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { catchError } from "@/lib/utils"
import { subscribeToWrapAction } from "@/app/_actions/stripe"
import { useRouter } from "next/navigation"

interface SubscribeButtonProps {
  productId: number
}

export function SubscribeButton({ productId }: SubscribeButtonProps) {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

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
  }

  return (
    <form className="w-full flex items-center justify-center" onSubmit={(e) => onSubmit(e)}>
      <Button
        aria-label="Subscribe"
        size="sm"
        className="w-2/3 rounded-xl"
        disabled={isPending}
      >
        {isPending && (
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        )}
        Become a Member Now
      </Button>
    </form>
  )
}