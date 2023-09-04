"use client"

import * as React from "react"

import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"

import { addContactAction } from "@/app/_actions/contact"
import type * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { contactSchema } from "@/lib/validations/contact"
import { toast } from "sonner"

import va from '@vercel/analytics';

type Inputs = z.infer<typeof contactSchema>

export default function DropOnLollywest() {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      contactInfo: "",
      message: "",
    },
  })

  function addContact(data: Inputs) {
    startTransition(async () => {
      const contactInfo = data.contactInfo
      const message = data.message

      va.track("Artist contact form")

      await addContactAction({ category: "artist", contactInfo, message })

      toast.success("Message Sent!")
    })
  }

  return (
    <Shell className="md:pb-10">
      <Header
        title="Apply to Drop on Lollywest"
        description="Learn how to get involved"
      />
      <Separator className="mb-2.5" />
      <Card
        as="section"
        id="add-contact"
        aria-labelledby="add-contact-heading"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Artist? Apply here</CardTitle>
          <CardDescription>
            Fill out the short form below and a member from our team will review it as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={(...args) => void form.handleSubmit(addContact)(...args)}
              className="grid w-full max-w-xl gap-5"
            >
              <FormField
                control={form.control}
                name="contactInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Info</FormLabel>
                    <FormControl>
                      <Input
                        id="contact-info"
                        aria-describedby="add-contact-info"
                        required
                        minLength={3}
                        maxLength={50}
                        placeholder="Enter your email or phone number here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preliminary Application</FormLabel>
                    <FormControl>
                      <Textarea
                        id="contact-message"
                        aria-describedby="contact-message-description"
                        minLength={3}
                        maxLength={1000}
                        placeholder="Type description of your music, fanbase, intrest in joining Lollywest, possibilities for wraps/decks, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-2">
                <Button disabled={isPending}>
                  {isPending && (
                    <Icons.spinner
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  Send
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Shell>
  )
}
