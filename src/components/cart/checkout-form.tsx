"use client"

import * as React from "react"
import { type z } from "zod"

import { catchError } from "@/lib/utils"
import { type createCheckoutSessionSchema } from "@/lib/validations/stripe"
import { Button } from "@/components/ui/button"
import { SheetFooter } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"
import { createCheckoutSessionAction } from "@/app/_actions/stripe"

type CheckoutFormProps = z.infer<typeof createCheckoutSessionSchema>

export function CheckoutForm({
  userId,
  stripeCustomerId,
  items,
}: CheckoutFormProps) {
  
  const [isPending, startTransition] = React.useTransition()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    startTransition(async () => {
      try {
        const session = await createCheckoutSessionAction({
          userId,
          stripeCustomerId,
          items,
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
    <form className="w-full" onSubmit={(e) => onSubmit(e)}>
      <SheetFooter className="mt-1.5">
        <Button
          aria-label="Proceed to checkout"
          size="sm"
          className="w-full"
          disabled={isPending}
        >
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Checkout
        </Button>
      </SheetFooter>
    </form>
  )
}
