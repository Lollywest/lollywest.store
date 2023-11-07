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

import { getCommunityPostsAction, getCommunityPostAction } from "@/app/_actions/post"

import { CommunityPostComment } from "@/components/community-post-comment"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { LikeIconToggle } from "@/components/like-toggle"
import { PostCommentToggleForm } from "@/components/post-comment-toggle"
import { GetPostReturn } from "@/types"
import { type StoredFile } from "@/types"
import { PostBadge, postBadgeVariants } from "@/components/ui/post-badges"
import VideoPlayer from "@/components/video-player"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Post",
  description: "Post description",
}

interface PostPageProps {
  params: {
    postId: string
    // artistId: number
  }
  // CommunityPost: GetPostReturn
}


export default async function PostPage({ params }: PostPageProps) {

  const postId = Number(params.postId)
  // const artistId = Number(params.artistId)
  // const CommunityPost:GetPostReturn = await getCommunityPostAction({
  const [CommunityPost] = await getCommunityPostAction({
    // artistId,
    postId,
  })

  // type post =  GetPostReturn 
  // const post: GetPostReturn = await db.query.posts.findFirst({
  //   where: eq(posts.id, postId),
  // })

  // if (!post) {
  //   notFound()
  // }

  // const artist = await db.query.artists.findFirst({
  //   columns: {
  //     id: true,
  //     name: true,
  //   },
  //   where: eq(artists.id, post.artistId),
  // })

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
    <Shell className="md:pb-10">
      <Breadcrumbs
        segments={[

          {
            title: "Back to community",
            href: `/artist-dashboard-page/${CommunityPost?.artistId}`,
          }
          // {
          //   title: product.name,
          //   href: `/product/${product.id}`,
          // },
        ]}
      />
      <div className="flex flex-1 flex-col gap-8 md:flex-row md:gap-16  ">

        <Separator className="mt-4 md:hidden" />
        <div className="flex flex-1 w-full flex-col gap-4 md:w-1/2 items-center">

          <ProductImageCarousel
            className="w-full md:w-1/2"
            // images={post.images ?? []}
            images={CommunityPost?.images as StoredFile[] ?? []}
            options={{
              loop: true,
            }}
          />

          {CommunityPost?.videoPlaybackId ? (
            // <div className=" grid sm:grid-cols-3 grid-cols-1 gap-2 sm:gap-12">
            <div className="flex flex-col pt-2 sm:flex-row sm:gap-16  sm:order-first max-h-[80vh] w-3/4">
              <VideoPlayer playbackId={CommunityPost?.videoPlaybackId} />
            </div>
            /* <div className="flex flex-col p-2 sm:col-span-2">
                                  <div className="flex-1 flex items-center pt-0 sm:pt-4 pb-4">
                                      <p >{CommunityPost.message}</p>
                                  </div>
                              </div> */
            // </div>
          ) : null}

          <div className=" flex w-3/4 flex-col gap-2 space-y-4">

            <div className="flex-1 ">
              <h2 className="line-clamp-1 text-2xl font-bold">{CommunityPost?.title}</h2>
              <div className="flex items-center gap-4">
                {/* </div>p>{date}</p> */}
                <p className="text-base text-muted-foreground" >{formatDate(CommunityPost?.createdAt ?? "")}</p>
              </div>
              <div className="space-x-2">
                {CommunityPost?.isArtist !== false ?
                  <PostBadge variant="artist"> Artist Post </PostBadge> : null}
                {CommunityPost?.isTrending !== false ?
                  <PostBadge variant="trending"> Trending </PostBadge> : null}
                {/* post.isNew is backwards right now, change to false later */}
                {CommunityPost?.isNew !== true ?
                  <PostBadge variant="new"> New </PostBadge> : null}
              </div>
            </div>

            <p >{CommunityPost?.message}</p>

            <div className="flex-1 flex items-center">
              <Button variant="ghost" className="rounded-xl  p-1">
                <Icons.share
                  className=" h-6 w-6"
                  aria-hidden="true"
                />
              </Button>
              <div className="  pl-2 pr-2">
                <LikeIconToggle postId={CommunityPost!.id} liked={CommunityPost!.likedByUser} numLikes={CommunityPost!.numLikes} />
                {/* <span className="  pr-8"> {CommunityPost?.numLikes}</span>\ */}
              </div>
              {/* <div className="flex-1 items-center"> */}
              {/* <PostCommentToggleForm postId={CommunityPost!.id} /> */}
              <Button variant="link" className="rounded-xl p-2">
                <Icons.message
                  className=" h-6 w-6"
                  aria-hidden="true"
                />
              </Button>
              <span className="">{CommunityPost?.numComments}</span>
              {/* </div> */}
            </div>

            <Separator className="mt-5 mb-5" />

            <div className="flex ">
              <span className="text-muted-foreground pt-1"> Add comment </span>
              <div className="flex-1">
                <PostCommentToggleForm postId={CommunityPost!.id} />
              </div>
            </div>

            {allCommunityPostComments.map((comment) => (
              // <CommunityPostComment key={comment.id} comment={comment} />
              comment.replyingTo === 0 ? (
                <CommunityPostComment key={comment.id} comment={comment} artistId={CommunityPost!.artistId} />
              ) : ("")
            ))}

          </div>

        </div>
      </div>

    </Shell >
  )
}