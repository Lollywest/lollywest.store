"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { catchError } from "@/lib/utils"
import { updateCartItemSchema } from "@/lib/validations/cart"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { addToCartAction } from "@/app/_actions/cart"

interface AddToCartFromProps {
  productId: number
}

type Inputs = z.infer<typeof updateCartItemSchema>

export function SponsorAddToCartForm({ productId }: AddToCartFromProps) {
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(updateCartItemSchema),
    defaultValues: {
      quantity: 2,
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await addToCartAction({
          productId,
          quantity: data.quantity,
        })
        toast.success("Added to cart.")
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        // className="grid gap-4 sm:max-w-[240px]"
        className="grid gap-4 sm:max-w-[600px]"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        {/* <div className="flex justify-between items-center"> */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sponsorship Amount: </FormLabel>
              <div className="flex items-center">
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter here (Min. 2)"

                    inputMode="numeric"
                    min={2}
                    // {...field}
                    onChange={(e) => {
                      const value = e.target.value
                      const parsedValue = parseInt(value, 10)
                      if (isNaN(parsedValue)) return
                      field.onChange(parsedValue)
                    }}
                  />
                </FormControl>
                <span className="mr-12 text-sm text-muted-foreground">
                  &nbsp;credits
                </span>
                <Button
                  size="sm"
                  className="h-9 w-full rounded-sm"
                  disabled={isPending}
                >
                  {isPending && (
                    <Icons.spinner
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  Add Sponsorship to cart
                  <span className="sr-only">Add to cart</span>
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
