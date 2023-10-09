import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/db"
//import { products, stores } from "@/db/schema"
import { posts, artists } from "@/db/schema"

import { env } from "@/env.mjs"
import { and, eq, not } from "drizzle-orm"

import { formatDate, toTitleCase } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { AddToCartForm } from "@/components/forms/add-to-cart-form"
import { Breadcrumbs } from "@/components/pagers/breadcrumbs"
import { ProductCard } from "@/components/product-card"
import { ProductImageCarousel } from "@/components/product-image-carousel"
import { Shell } from "@/components/shells/shell"
import { WrapProductCard } from "@/components/wrap-product-card"
import { SponsorProductCard } from "@/components/sponsor-product-card"
import { getAllCommentsAction, getCommentRepliesAction } from "@/app/_actions/comments"
import { CommunityPostComment } from "@/components/community-post-comment"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { LikeIconToggle } from "@/components/like-toggle"
import { PostCommentToggleForm } from "@/components/post-comment-toggle"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Post",
  description: "Post description",
}

interface PostPageProps {
  params: {
    postId: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const postId = Number(params.postId)

  const post = await db.query.posts.findFirst({
    where: eq(posts.id, postId),
  })

  if (!post) {
    notFound()
  }

  const artist = await db.query.artists.findFirst({
    columns: {
      id: true,
      name: true,
    },
    where: eq(artists.id, post.artistId),
  })

  //   const productsFromStore = artist
  //     ? await db
  //     .select()
  //     .from(products)
  //     .limit(4)
  //     .where(
  //       and(
  //         eq(products.artistID, product.artistID),
  //         not(eq(products.id, postId))
  //       )
  //     )
  //     : []

  const allCommunityPostComments = await getAllCommentsAction({
    postId,
  })



  return (
    <Shell>
      <Breadcrumbs
        segments={[
          // {
          //   title: "Products",
          //   href: "/products",
          // },
          {
            title: "Back to community",
            href: `/artist-community-page`,
          },
          // {
          //   title: product.name,
          //   href: `/product/${product.id}`,
          // },
        ]}
      />
      <div className="flex flex-col gap-8 md:flex-row md:gap-16  ">

        <Separator className="mt-4 md:hidden" />
        <div className="flex flex-1 w-full flex-col gap-4 md:w-1/2 items-center">

          <ProductImageCarousel
            className="w-full md:w-1/2"
            images={post.images ?? []}
            options={{
              loop: true,
            }}
          />


          <div className="space-y-2 flex-1 ">


            {/* {artist ? (
                            <Link
                                href={`/artist-products?artist_ids=${artist.id}`}
                                className="line-clamp-1 inline-block text-base text-muted-foreground hover:underline"
                            >
                                {artist.name}
                            </Link>
                        ) : null} */}
          </div>


          <div className="flex-1 gap-2 space-y-4">

            <div className="flex-1 ">
              <h2 className="line-clamp-1 text-2xl font-bold">{post.title}</h2>
              <div className="flex items-center gap-4">
                {/* </div>p>{date}</p> */}
                <p className="text-base text-muted-foreground" >{formatDate(post.createdAt!)}</p>
              </div>
            </div>

            <p >{post.message}</p>

            <div className="flex-1 flex ">
              <Button variant="ghost" className="rounded-xl  p-1">
                <Icons.share
                  className=" h-6 w-6"
                  aria-hidden="true"
                />
              </Button>
              <div className=" ">
                <div className=" flex items-center">
                  <LikeIconToggle postId={post.id} />
                  <span className="  pr-8"> {post.numLikes}</span>
                </div>
              </div>
              <div className="flex-1 ">
                <PostCommentToggleForm postId={post.id} />
              </div>
            </div>

            <Separator className="mt-5 mb-5" />
            {allCommunityPostComments.map((comment) => (
              <CommunityPostComment key={comment.id} comment={comment} />
            ))}
          </div>
          {/* <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {product.description ??
                  "No description is available for this product."}
              </AccordionContent>
            </AccordionItem>
          </Accordion> */}
        </div>
      </div>
      {/* {artist && productsFromStore.length > 0 ? (
        <div className="overflow-hidden md:pt-6">
          <h2 className="line-clamp-1 flex-1 text-2xl font-bold">
            More from {artist.name}
          </h2>
          <div className="overflow-x-auto pb-2 pt-6">
            <div className="flex w-fit gap-4">
              {productsFromStore.map((product) => (
                product.category === "deck" ? (
                  <ProductCard key={product.id} product={product} className="min-w-[260px]" />
                ) : product.category === "wrap" ? (
                  <WrapProductCard key={product.id} product={product} className="min-w-[260px]" />
                ) : product.category === "sponsorship" ? (
                  <SponsorProductCard key={product.id} product={product} className="min-w-[260px]" />
                ) : (
                  <ProductCard key={product.id} product={product} />
                )
              ))}
            </div>
          </div>
        </div>
      ) : null} */}
    </Shell>
  )
}