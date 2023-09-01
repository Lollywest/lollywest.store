"use client"

import * as React from "react"

import { catchError } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { createAccountLinkAction } from "@/app/_actions/stripe"

interface ConnectToStripeButtonProps {
  artistId: number
}

export function ConnectArtistToStripeButton({
  artistId,
}: ConnectToStripeButtonProps) {
  const [isPending, startTransaction] = React.useTransition()

  return (
    <Button
      onClick={() => {
        startTransaction(async () => {
          try {
            const connection = await createAccountLinkAction({ artistId })
            window.location.href = connection.url
          } catch (err) {
            catchError(err)
          }
        })
      }}
      disabled={isPending}
    >
      {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      Connect to Stripe
    </Button>
  )
}
