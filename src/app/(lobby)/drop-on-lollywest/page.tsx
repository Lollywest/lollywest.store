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

import { addContactAction } from "@/app/_actions/contact"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Blog",
  description: "Explore the latest news and updates from the community",
}

export default function DropOnLollywest() {

  async function addContact(fd: FormData) {
    "use server"

    const contactInfo = fd.get("contactInfo") as string
    const message = fd.get("message") as string

    await addContactAction({category: "artist", contactInfo, message})
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
          <form
            // action={(() => {addContact})}
            action={() => addContact}
            className="grid w-full max-w-xl gap-5"
          >
            <fieldset className="grid gap-2.5">
              <Label htmlFor="contact-info">Contact Info</Label>
              <Input
                id="contact-info"
                aria-describedby="add-contact-info"
                name="contactInfo"
                required
                minLength={3}
                maxLength={50}
                placeholder="Enter your email or phone number here."
              />
            </fieldset>
            <fieldset className="grid gap-2.5">
              <Label htmlFor="contact-message">Preliminary Application</Label>
              <Textarea
                id="contact-message"
                aria-describedby="contact-message-description"
                name="message"
                minLength={3}
                maxLength={1000}
                placeholder="Type description of your music, fanbase, intrest in joining Lollywest, possibilities for wraps/decks, etc."
              />
            </fieldset>
            <div className="flex space-x-2">
              <LoadingButton>
                Send Application
                <span className="sr-only">Send Application</span>
              </LoadingButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </Shell>
  )
}
