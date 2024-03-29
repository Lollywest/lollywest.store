// "use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import * as React from "react"
import Image from "next/image"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { LikeIconToggle } from "@/components/like-toggle"
import { type Post } from "@/db/schema"
import { cn, formatDate, formatTime, formatTimeSince, toTitleCase } from "@/lib/utils"
import { ProductImageCarousel } from "@/components/product-image-carousel"
import { Badge } from "@/components/ui/badge"
import { PostBadge, postBadgeVariants } from "@/components/ui/post-badges"

import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { getAllCommentsAction, getFirstComments } from "@/app/_actions/comments"
import { CommunityPostComment } from "@/components/community-post-comment"
import { GetPostReturn } from "@/types"
import { type StoredFile } from "@/types"
import VideoPlayer from "@/components/video-player"
import { UserProfileBadge } from "@/components/user-profile-badge"
import { DashboardPostComment } from "@/components/dashboard-post-comment"
import { PostCommentToggleForm } from "@/components/post-comment-toggle"
import { DeletePostHoverCard } from "@/components/delete-post-hovercard"

// interface DashboardPostProps {
//     title: string;
//     content: string;
//     date: string;
//     time: string;
// }
interface DashboardPostProps extends React.HTMLAttributes<HTMLDivElement> {
    post: GetPostReturn
    variant?: "default" | "switchable"
    onSwitch?: () => Promise<void>
    isArtist: boolean,
    // title: string;
    // message: string;
    // //date: string;
    // createdAt: Date | null;
}

// export function DashboardPostCard({ title, content, date, time }: DashboardPostProps) {
export async function DashboardPostCard({
    post,
    variant = "default",
    onSwitch,
    className,
    isArtist,
    ...props
}: DashboardPostProps) {

    const postId = post.id
    // let limit = 2
    // const allArtistPostComments = await getAllCommentsAction({
    //     postId,
    //     limit,
    // })





    const displayLimit = 2
    const buffer = 8  // adjust later based on expected distribution of comments/replies ?? prob a better way to do this
    const potentialLimit = displayLimit + buffer;

    // const allArtistPostComments = await getAllCommentsAction({
    //     postId,
    //     limit: potentialLimit,
    // })

    const commentLimit = 3
    const cardFirstComments = await getFirstComments({
        postId,
        limit: commentLimit,
    })

    // const filteredComments = allArtistPostComments.filter(comment => comment.replyingTo === null).slice(0, displayLimit)

    return (
        // <Card className="grid rounded-xl my-4 ">
        <Card className="group relative overflow-hidden rounded-xl flex-grow bg-black shadow-md shadow-[#3457e5]/50 m-2">

            <Link
                aria-label={`View Post`}
                href={`/community-post/${post.id}`}
            >


                <CardHeader className="pb-0 pt-2 pr-2">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 ">
                            <CardTitle className="text-xl ">{post.title}</CardTitle>
                        </div>
                        <UserProfileBadge userImage={post.image} userUsername={post.username} userPoints={post.points} isUserPremium={post.userIsPremium} />
                    </div>

                </CardHeader>
            </Link>
            <CardContent className="pb-0" >
                <div className="space-x-2">
                    {post.isArtist !== false ?
                        <PostBadge variant="artist"> Artist Post </PostBadge> : null}
                    {post.isTrending !== false ?
                        <PostBadge variant="trending"> Trending </PostBadge> : null}
                    {/* post.isNew is backwards right now, change to false later */}
                    {post.isNew !== true ?
                        <PostBadge variant="new"> New </PostBadge> : null}
                </div>
                {/* If post includes images */}
                {Array.isArray(post.images) && post.images.length > 0 ? (
                    <div className=" grid sm:grid-cols-3 grid-cols-1 gap-2 sm:gap-12">
                        {/* <div className="flex-1 flex flex-col col-span-2"> */}

                        <div className="flex flex-col pt-2 sm:flex-row sm:gap-16  sm:order-first">
                            <ProductImageCarousel
                                // className="flex-1 w-full md:w-1/2"
                                className="flex-1 w-full mb-0 sm:w-1/2"

                                images={post.images as StoredFile[]}
                                options={{
                                    loop: true,
                                }}
                            />
                        </div>

                        <div className="flex flex-col p-2 sm:col-span-2">
                            {/* <CardTitle className="text-xl ">{title}</CardTitle> */}

                            <div className="flex-1 flex items-center pt-0 sm:pt-4 pb-4">
                                <p >{post.message}</p>
                            </div>
                        </div>
                    </div>
                )
                    : post.videoPlaybackId ? (
                        <div className=" grid sm:grid-cols-3 grid-cols-1 gap-2 sm:gap-12">
                            <div className="flex flex-col pt-2 sm:flex-row sm:gap-16  sm:order-first">
                                <VideoPlayer playbackId={post.videoPlaybackId} />
                            </div>
                            <div className="flex flex-col p-2 sm:col-span-2">
                                <div className="flex-1 flex items-center pt-0 sm:pt-4 pb-4">
                                    <p >{post.message}</p>
                                </div>
                            </div>
                        </div>

                        // <div className=" grid grid-cols-3 gap-12">
                        //     <div className="flex-1 flex flex-col col-span-2">
                        //         <div className="flex-1 flex items-center pt-4 pb-4">
                        //             <p >{post.message}</p>
                        //         </div>
                        //     </div>
                        //     <div className="flex flex-col md:flex-row md:gap-16 p-2">
                        //         <VideoPlayer playbackId={post.videoPlaybackId} />
                        //     </div>
                        // </div>
                    )
                        :
                        // If no images in post
                        <div className=" grid grid-cols-3 gap-12">
                            <div className="flex-1 flex flex-col col-span-3">
                                <div className="flex-1 flex items-center pt-4 pb-4">
                                    <p >{post.message}</p>
                                </div>
                            </div>
                        </div>
                }
                {/* <div className="flex items-center gap-4">
                    <div className="flex-1 ">
                        <CardTitle className="text-xl ">{post.title}</CardTitle>
                        <p className="pt-10  ">{post.message}</p>
                    </div>
                    <div className="pl-8 pt-6 pb-4 ">
                        <Image
                            src="/images/DeleteLater-Example-Profile-Pic.png"
                            alt="Artist Profile Picture"
                            className="border-4 border-gray-350 rounded"
                            width={300}
                            height={300}
                        />
                    </div>
                </div> */}

                <div className="flex items-center">
                    <div className="flex-1 ">
                        <CardDescription className="">
                            <div className="flex items-center gap-4">
                                {/* </div>p>{date}</p> */}
                                {/* <p>{formatDate(post.createdAt!)}</p>
                                <p>{formatTime(post.createdAt!)} </p> */}
                                <p>{formatTimeSince(post.createdAt!)} </p>
                            </div>
                        </CardDescription>
                    </div>

                    <div className=" flex items-center ">
                        <LikeIconToggle postId={post.id} liked={post.likedByUser} numLikes={post.numLikes} />
                        {/* <span className=" pr-8"> {post.numLikes}</span> */}
                        <Link
                            aria-label={`View all comments`}
                            href={`/community-post/${post.id}`}
                        >
                            <Button variant="link" className="rounded-xl p-2">
                                <Icons.feather
                                    className=" h-6 w-6"
                                    aria-hidden="true"
                                />
                            </Button>
                        </Link>
                        <span className=" pr-2"> {post.numComments}</span>
                        {/* <div className="flex-1 ">
                            <CommentToggleForm postId={post.id} />
                        </div> */}
                        {/* <Button variant="ghost" className="rounded-xl  p-1">
                            <Icons.share
                                className=" h-6 w-6"
                                aria-hidden="true"
                            />
                        </Button> */}
                        {isArtist !== false ?
                            <DeletePostHoverCard postId={post.id} className="p-1" /> : null}
                    </div>


                    {/* Add Comment Quantity */}
                    {/* <span className="pl-1 ">555 </span> */}


                </div>
                <Separator className="mt-2" />
                <CardDescription className="">
                    {post.numComments !== 0 ?
                        <div className="flex items-center gap-4">
                            {/* <p>See all comments</p> */}
                            <Link
                                aria-label={`View all comments`}
                                href={`/community-post/${post.id}`}
                            >
                                <Button variant="link" className="rounded-xl p-2 text-sm text-muted-foreground">
                                    ... See all Comments
                                </Button>
                            </Link>
                        </div>
                        :
                        <Link
                            aria-label={`View all comments`}
                            href={`/community-post/${post.id}`}
                        >
                            <Button variant="link" className="rounded-xl p-2 text-sm text-muted-foreground">
                                See Full Post
                            </Button>
                        </Link>}


                </CardDescription>
            </CardContent>
            <CardFooter>

                <div className="flex-1">
                    <div className="flex pb-2">
                        <span className="text-muted-foreground pt-1"> Thoughts? </span>
                        <div className="flex-1">
                            <PostCommentToggleForm postId={post.id} />
                        </div>
                    </div>

                    {/* {cardFirstComments.map((comment) => (
                        // <CommunityPostComment key={comment.id} comment={comment} />
                        // <DashboardPostComment key={comment.id} comment={comment} artistId={post.artistId} />
                        // comment.replyingTo === 0 ? (
                        //     <CommunityPostComment key={comment.id} comment={comment} artistId={post.artistId} />
                        // ) :
                        //     null // Make limit = limit + 1
                    ))} */}
                </div>

            </CardFooter>

        </Card>

    )

}