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

    await addContactAction({category: "partner", contactInfo, message})
  }

  return (
    <Shell className="md:pb-10">
      <Header
        title="Partnerships with Lollywest"
        description="Interested in a collaboration or partnership with Lollywest?"
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
            action={addContact}
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
              <Label htmlFor="contact-message">Partnership Inquiry</Label>
              <Textarea
                id="contact-message"
                aria-describedby="contact-message-description"
                name="message"
                minLength={3}
                maxLength={1000}
                placeholder="Type the organization/venue/person you represent, intrest in collaboration or partnering with Lollywest, possible partnerships/collaborations etc."
              />
            </fieldset>
            <div className="flex space-x-2">
              <LoadingButton>
                Send Inquiry
                <span className="sr-only">Send Inquiry</span>
              </LoadingButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </Shell>
  )
}


// import { type Metadata } from "next"
// import Image from "next/image"
// import Link from "next/link"
// import { env } from "@/env.mjs"
// import { allPosts } from "contentlayer/generated"
// import dayjs from "dayjs"

// import { formatDate } from "@/lib/utils"
// import { AspectRatio } from "@/components/ui/aspect-ratio"
// import { Separator } from "@/components/ui/separator"
// import { Header } from "@/components/header"
// import { Icons } from "@/components/icons"
// import { Shell } from "@/components/shells/shell"

// import { SubscribeToNewsletterForm } from "@/components/forms/subscribe-to-newsletter-form"
// import { AddProductForm } from "@/components/forms/add-product-form"
// import { SignUpForm } from "@/components/forms/signup-form"

// import { siteConfig } from "@/config/site"
// import { cn } from "@/lib/utils"
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"
// import { Button } from "@/components/ui/button"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// import { redirect } from "next/navigation"
// import { currentUser } from "@clerk/nextjs"
// import { products, stores } from "@/db/schema"


// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { OAuthSignIn } from "@/components/auth/oauth-signin"
// import { notFound } from "next/navigation"
// import { db } from "@/db"
// import { and, eq } from "drizzle-orm"

// import { UpdateProductForm } from "@/components/forms/update-product-form"
// import { ProductPager } from "@/components/pagers/product-pager"

// import { revalidatePath } from "next/cache"



// import { buttonVariants } from "@/components/ui/button"

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { LoadingButton } from "@/components/ui/loading-button"
// import { Textarea } from "@/components/ui/textarea"
// import { ConnectStoreToStripeButton } from "@/components/connect-store-to-stripe-button"
// import { checkStripeConnectionAction } from "@/app/_actions/stripe"


// interface UpdateProductPageProps {
//   params: {
//     storeId: string
//     productId: string
//   }
// }

// interface UpdateStorePageProps {
//   params: {
//     storeId: string
//   }
// }

// export const metadata: Metadata = {
//   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
//   title: "Blog",
//   description: "Explore the latest news and updates from the community",
// }

// // export default function BlogPage() {
// export default async function ParnerWithLollywest({
//   params,
// }: UpdateStorePageProps) {
//   const storeId = Number(params.storeId)
//   const posts = allPosts
//     .filter((post) => post.published)
//     .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())


    
//     async function updateStore(fd: FormData) {
//       "use server"
  
//       const name = fd.get("name") as string
//       const description = fd.get("description") as string
  
//       // const storeWithSameName = await db.query.stores.findFirst({
//       //   where: and(eq(stores.name, name), not(eq(stores.id, storeId))),
//       //   columns: {
//       //     id: true,
//       //   },
//       // })
  
//       // if (storeWithSameName) {
//       //   throw new Error("Store name already taken")
//       // }
  
//       await db
//         .update(stores)
//         .set({ name, description })
//         .where(eq(stores.id, storeId))
  
//       revalidatePath(`/dashboard/stores/${storeId}`)
//     }
  
//     async function deleteStore() {
//       "use server"
  
//       const store = await db.query.stores.findFirst({
//         where: eq(stores.id, storeId),
//         columns: {
//           id: true,
//         },
//       })
  
//       if (!store) {
//         throw new Error("Store not found")
//       }
  
//       await db.delete(stores).where(eq(stores.id, storeId))
  
//       // Delete all products of this store
//       await db.delete(products).where(eq(products.storeId, storeId))
  
//       const path = "/dashboard/stores"
//       revalidatePath(path)
//       redirect(path)
//     }

//   return (
//     <Shell className="md:pb-10">
//       <Header
//         title="Partnerships with Lollywest"
//         description="Interested in a collaboration or partnership with Lollywest?"
//       />

      
//       <Separator className="mb-2.5" />


//       <Card
//         as="section"
//         id="update-store"
//         aria-labelledby="update-store-heading"
//       >
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl">Partnership Inquiry</CardTitle>
//           <CardDescription>
//             Fill out the form below and a member from our sales team will reach out with future steps
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form
//             // eslint-disable-next-line @typescript-eslint/no-misused-promises
//             action={updateStore}
//             className="grid w-full max-w-xl gap-5"
//           >
//             <fieldset className="grid gap-2.5">
//               <Label htmlFor="update-store-name">Contact Info</Label>
//               <Input
//                 id="update-store-name"
//                 aria-describedby="update-store-name-description"
//                 name="name"
//                 required
//                 minLength={3}
//                 maxLength={50}
//                 placeholder="Enter your email or phone number here."
//                 //defaultValue={store.name}
//               />
//             </fieldset>
//             <fieldset className="grid gap-2.5">
//               <Label htmlFor="update-store-description">Reason for Reaching Out</Label>
//               <Textarea
//                 id="update-store-description"
//                 aria-describedby="update-store-description-description"
//                 name="description"
//                 minLength={3}
//                 maxLength={1000}
//                 placeholder="Type the organization/venue/person you represent, intrest in collaboration or partnering with Lollywest, possible partnerships/collaborations etc."
//                 //defaultValue={store.description ?? ""}
//               />
//             </fieldset>
//             <div className="flex space-x-2">
//               <LoadingButton>
//                 Send Inquiry
//                 <span className="sr-only">Update store</span>
//               </LoadingButton>
//               {/* <LoadingButton
//                 // eslint-disable-next-line @typescript-eslint/no-misused-promises
//                 formAction={deleteStore}
//                 variant="destructive"
//               >
//                 Delete Store
//                 <span className="sr-only">Delete store</span>
//               </LoadingButton> */}
//             </div>
//           </form>
//         </CardContent>
//       </Card>

      
//     </Shell>
//   )
// }