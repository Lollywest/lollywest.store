
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
import { getAllCommentsAction } from "@/app/_actions/comments"
import { CommunityPostComment } from "@/components/community-post-comment"
import { GetPostReturn } from "@/types"
import { type StoredFile } from "@/types"
import { UserProfileBadge } from "@/components/user-profile-badge"

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

    let allArtistPostComments = await getAllCommentsAction({
        postId,
        limit: potentialLimit,
    })

    const filteredComments = allArtistPostComments.filter(comment => comment.replyingTo === null).slice(0, displayLimit)


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
                <CardContent  >
                    {post.isArtist !== false ?
                        <PostBadge variant="artist"> Artist Post </PostBadge> : null}

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
                    ) :
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
                                    <Icons.message
                                        className=" h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </Button>
                            </Link>
                            <span className=" pr-8"> {post.numComments}</span>
                            {/* <div className="flex-1 ">
                            <CommentToggleForm postId={post.id} />
                        </div> */}
                            <Button variant="ghost" className="rounded-xl  p-1">
                                <Icons.share
                                    className=" h-6 w-6"
                                    aria-hidden="true"
                                />
                            </Button>
                        </div>


                        {/* Add Comment Quantity */}
                        {/* <span className="pl-1 ">555 </span> */}


                    </div>
                    <Separator className="mt-2" />
                    <CardDescription className="">
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
                    </CardDescription>
                </CardContent>
                <CardFooter>

                    <div className="flex-1">
                        {filteredComments.map((comment) => (
                            // <CommunityPostComment key={comment.id} comment={comment} />
                            <CommunityPostComment key={comment.id} comment={comment} artistId={post.artistId} />
                            // comment.replyingTo === 0 ? (
                            //     <CommunityPostComment key={comment.id} comment={comment} artistId={post.artistId} />
                            // ) :
                            //     null // Make limit = limit + 1
                        ))}
                    </div>
                </CardFooter>
            </Link>
        </Card>

    )

}