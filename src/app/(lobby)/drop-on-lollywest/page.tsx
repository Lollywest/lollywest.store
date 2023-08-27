import { type Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { env } from "@/env.mjs"
import { allPosts } from "contentlayer/generated"
import dayjs from "dayjs"

import { formatDate } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shells/shell"

import { SubscribeToNewsletterForm } from "@/components/forms/subscribe-to-newsletter-form"
import { AddProductForm } from "@/components/forms/add-product-form"
import { SignUpForm } from "@/components/forms/signup-form"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { products, artists } from "@/db/schema"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OAuthSignIn } from "@/components/auth/oauth-signin"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { and, eq } from "drizzle-orm"

import { UpdateProductForm } from "@/components/forms/update-product-form"
import { ProductPager } from "@/components/pagers/product-pager"

import { revalidatePath } from "next/cache"



import { buttonVariants } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingButton } from "@/components/ui/loading-button"
import { Textarea } from "@/components/ui/textarea"
import { ConnectStoreToStripeButton } from "@/components/connect-store-to-stripe-button"
import { checkStripeConnectionAction } from "@/app/_actions/stripe"


interface UpdateProductPageProps {
  params: {
    storeId: string
    productId: string
  }
}

interface UpdateStorePageProps {
  params: {
    storeId: string
  }
}

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Blog",
  description: "Explore the latest news and updates from the community",
}

// export default function BlogPage() {
export default async function DropOnLollywest({
  params,
}: UpdateStorePageProps) {
  const storeId = Number(params.storeId)
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())


    
    async function updateStore(fd: FormData) {
      "use server"
  
      const name = fd.get("name") as string
      const description = fd.get("description") as string
  
      // const storeWithSameName = await db.query.stores.findFirst({
      //   where: and(eq(stores.name, name), not(eq(stores.id, storeId))),
      //   columns: {
      //     id: true,
      //   },
      // })
  
      // if (storeWithSameName) {
      //   throw new Error("Store name already taken")
      // }
  
      await db
        .update(artists)
        .set({ name, description })
        .where(eq(artists.id, storeId))
  
      revalidatePath(`/dashboard/stores/${storeId}`)
    }
  
    // async function deleteStore() {
    //   "use server"
  
    //   const store = await db.query.artists.findFirst({
    //     where: eq(artists.id, storeId),
    //     columns: {
    //       id: true,
    //     },
    //   })
  
    //   if (!store) {
    //     throw new Error("Store not found")
    //   }
  
    //   await db.delete(stores).where(eq(stores.id, storeId))
  
    //   // Delete all products of this store
    //   await db.delete(products).where(eq(products.storeId, storeId))
  
    //   const path = "/dashboard/stores"
    //   revalidatePath(path)
    //   redirect(path)
    // }

  return (
    <Shell className="md:pb-10">
      <Header
        title="Apply to Drop on Lollywest"
        description="Learn how to get involved"
      />

      
      <Separator className="mb-2.5" />


      <Card
        as="section"
        id="update-store"
        aria-labelledby="update-store-heading"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Artist? Apply here</CardTitle>
          <CardDescription>
            Fill out the short form below and a member from our team will review it as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            action={updateStore}
            className="grid w-full max-w-xl gap-5"
          >
            <fieldset className="grid gap-2.5">
              <Label htmlFor="update-store-name">Contact Info</Label>
              <Input
                id="update-store-name"
                aria-describedby="update-store-name-description"
                name="name"
                required
                minLength={3}
                maxLength={50}
                placeholder="Enter your email or phone number here."
                //defaultValue={store.name}
              />
            </fieldset>
            <fieldset className="grid gap-2.5">
              <Label htmlFor="update-store-description">Preliminary Application</Label>
              <Textarea
                id="update-store-description"
                aria-describedby="update-store-description-description"
                name="description"
                minLength={3}
                maxLength={1000}
                placeholder="Type description of your music, fanbase, intrest in joining Lollywest, possibilities for wraps/decks, etc."
                //defaultValue={store.description ?? ""}
              />
            </fieldset>
            <div className="flex space-x-2">
              <LoadingButton>
                Send Application
                <span className="sr-only">Update store</span>
              </LoadingButton>
              {/* <LoadingButton
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                formAction={deleteStore}
                variant="destructive"
              >
                Delete Store
                <span className="sr-only">Delete store</span>
              </LoadingButton> */}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Choose your preferred sign up method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <OAuthSignIn />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              aria-label="Sign in"
              href="/signin"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card> */}

      {/* <section
            id="newsletter"
            aria-labelledby="newsletter-heading"
            className="space-y-3"
          >
            <h4 className="text-base font-medium">
              Subscribe to our newsletter
            </h4>
            <SubscribeToNewsletterForm />
          </section> */}


      {/* <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Who can Drop on Lollywest?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}


      {/* <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post, i) => (
          <Link key={post.slug} href={post.slug}>
            <article className="flex flex-col space-y-2.5">
              <AspectRatio ratio={16 / 9}>
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 100vw"
                    className="rounded-lg object-cover"
                    priority={i <= 1}
                  />
                ) : (
                  <div
                    aria-label="Placeholder"
                    role="img"
                    aria-roledescription="placeholder"
                    className="flex h-full w-full items-center justify-center rounded-lg bg-secondary"
                  >
                    <Icons.placeholder
                      className="h-9 w-9 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </AspectRatio>
              <h2 className="line-clamp-1 text-xl font-semibold">
                {post.title}
              </h2>
              <p className="line-clamp-2 text-muted-foreground">
                {post.description}
              </p>
              {/* {post.date ? (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.date)}
                </p>
              ) : null} */}
            {/* </article>
          </Link>
        ))} */}
      {/* </div> */} 
    </Shell>
  )
}
