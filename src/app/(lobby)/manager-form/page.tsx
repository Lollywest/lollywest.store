"use client"

import * as React from "react"
import { type Metadata } from "next"
import { env } from "@/env.mjs"

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
import { Label } from "@/components/ui/label"
import { LoadingButton } from "@/components/ui/loading-button"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"

import { addContactAction } from "@/app/_actions/contact"
import * as z from "zod"
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

      console.log("check")

      await addContactAction({ category: "manager", contactInfo, message })
    })
  }

  return (
    <Shell className="md:pb-10">
      <Header
        title="Manager or Label Representative?"
        description="Fill out the contact form below to get in touch"
      />
      <Separator className="mb-2.5" />
      <Card
        as="section"
        id="add-contact"
        aria-labelledby="add-contact-heading"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Contact Form</CardTitle>
          <CardDescription>
            Fill out the form below and a member from our sales team will reach out with future steps
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
                    <FormLabel>Reason for Reaching Out</FormLabel>
                    <FormControl>
                      <Textarea
                        id="contact-message"
                        aria-describedby="contact-message-description"
                        minLength={3}
                        maxLength={1000}
                        placeholder="Enter name of label/studio you represent, intrest in joining Lollywest, number/size of artists, possibilities for partnerships/collaborations, possible artist decks/wraps, etc."
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
                  Send Contact Form
                  <span className="sr-only">Send Contact Form</span>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Shell>
  )
}


// import { type Metadata } from "next"
// import { env } from "@/env.mjs"

// import { Separator } from "@/components/ui/separator"
// import { Header } from "@/components/header"
// import { Shell } from "@/components/shells/shell"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { LoadingButton } from "@/components/ui/loading-button"
// import { Textarea } from "@/components/ui/textarea"

// import { addContactAction } from "@/app/_actions/contact"

// export const metadata: Metadata = {
//   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
//   title: "Blog",
//   description: "Explore the latest news and updates from the community",
// }

// export default function DropOnLollywest() {

//   async function addContact(fd: FormData) {
//     "use server"

//     const contactInfo = fd.get("contactInfo") as string
//     const message = fd.get("message") as string

//     await addContactAction({category: "manager", contactInfo, message})
//   }

//   return (
//     <Shell className="md:pb-10">
//       <Header
//         title="Manager or Label Representative?"
//         description="Fill out the contact form below to get in touch"
//       />
//       <Separator className="mb-2.5" />
//       <Card
//         as="section"
//         id="add-contact"
//         aria-labelledby="add-contact-heading"
//       >
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl">Contact Form</CardTitle>
//           <CardDescription>
//             Fill out the form below and a member from our sales team will reach out with future steps
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form
//             // action={(() => {addContact})}
//             action={() => addContact}
//             className="grid w-full max-w-xl gap-5"
//           >
//             <fieldset className="grid gap-2.5">
//               <Label htmlFor="contact-info">Contact Info</Label>
//               <Input
//                 id="contact-info"
//                 aria-describedby="add-contact-info"
//                 name="contactInfo"
//                 required
//                 minLength={3}
//                 maxLength={50}
//                 placeholder="Enter your email or phone number here."
//               />
//             </fieldset>
//             <fieldset className="grid gap-2.5">
//               <Label htmlFor="contact-message">Reason for Reaching Out</Label>
//               <Textarea
//                 id="contact-message"
//                 aria-describedby="contact-message-description"
//                 name="message"
//                 minLength={3}
//                 maxLength={1000}
//                 placeholder="Enter name of label/studio you represent, intrest in joining Lollywest, number/size of artists, possibilities for partnerships/collaborations, possible artist decks/wraps, etc."
//               />
//             </fieldset>
//             <div className="flex space-x-2">
//               <LoadingButton>
//                 Send Contact Form
//                 <span className="sr-only">Send Contact Form</span>
//               </LoadingButton>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </Shell>
//   )
// }
