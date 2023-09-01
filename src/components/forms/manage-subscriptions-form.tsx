"use client"

import * as React from "react"
import { type z } from "zod"

import { catchError } from "@/lib/utils"
import { type manageSubscriptionSchema } from "@/lib/validations/stripe"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { manageSubscriptionAction } from "@/app/_actions/stripe"

type ManageSubscriptionsFormProps = z.infer<typeof manageSubscriptionSchema>

export function ManageSubscriptionsForm({
  userId,
  stripeCustomerId,
}: ManageSubscriptionsFormProps) {
  const [isPending, startTransition] = React.useTransition()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    startTransition(async () => {
      try {
        const session = await manageSubscriptionAction({
          userId,
          stripeCustomerId,
        })
        if (session) {
          window.location.href = session.url ?? "/dashboard/billing"
        }
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <form
      className="mt-4 flex w-full items-center justify-center"
      onSubmit={(e) => onSubmit(e)}
    >
      <Button
        className="flex h-14 w-1/2 items-center justify-center"
        disabled={isPending}
      >
        {isPending && (
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin text-xl"
            aria-hidden="true"
          />
        )}
        Manage Billing
      </Button>
    </form>
  )
}
