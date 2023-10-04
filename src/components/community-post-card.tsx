
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
import { Badge } from "@/components/ui/badge"
import { UserProfileBadge } from "@/components/user-profile-badge"
import { Separator } from "@/components/ui/separator"
import { NewCommentForm } from "@/components/forms/new-comment-form"
import { UserAvatar } from "@/components/user-avatar"
import { CommunityPostComment } from "@/components/community-post-comment"
import { cn, formatDate, toTitleCase } from "@/lib/utils"

import { type Post } from "@/db/schema"
import { db } from "@/db"
import { posts, comments, artists } from "@/db/schema"
import { desc } from "drizzle-orm"
import { eq } from "drizzle-orm"
import { getAllCommentsAction } from "@/app/_actions/comments"
import { CommentToggleForm } from "@/components/comment-toggle"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ProductImageCarousel } from "@/components/product-image-carousel"
import Link from "next/link"

interface CommunityPostProps extends React.HTMLAttributes<HTMLDivElement> {
    post: Post
    variant?: "default" | "switchable"
    onSwitch?: () => Promise<void>
    // title: string;
    // message: string;
    // //date: string;
    // createdAt: Date | null;
}

export async function CommunityPostCard({
    post,
    variant = "default",
    onSwitch,
    className,

    ...props
}: CommunityPostProps) {
    // const allCommunityPostComments = await db
    //     .select()
    //     .from(comments)
    //     .limit(2)
    //     .orderBy(desc(comments.createdAt)),

    const postId = post.id
    const limit = 2

    const allCommunityPostComments = await getAllCommentsAction({
        postId,
        limit,
    })


    // const allCommunityPostComments = await db.query.artists.findFirst({
    //     columns: {
    //         id: true,
    //         name: true,
    //         message: true,
    //     },
    //     where: eq(artists.id, artistsId),
    //     })

    return (
        <Card className="grid rounded-xl ">

            {/* <CardHeader className="pb-0 pt-2">
                <div className="flex items-center gap-4">
                    <div className="flex-1 ">
                        <CardTitle className="text-xl ">{title}</CardTitle>
                    </div>
                    <UserProfileBadge />
                </div>

            </CardHeader> */}
            <CardHeader className="pb-0 pt-2">
                <div className="flex items-center gap-4">
                    <div className="flex-1 ">
                        <CardTitle className="text-xl ">{post.title}</CardTitle>
                    </div>
                    <UserProfileBadge />
                </div>

            </CardHeader>
            <CardContent className="pb-0 ">

                {/* Add place to show comments ? */}
                <div className="flex grid grid-cols-3 gap-12">
                    <div className="flex-1 flex flex-col col-span-2">
                        {/* <CardTitle className="text-xl ">{title}</CardTitle> */}
                        <div className="pt-2 ">
                            <Badge> Badge </Badge>
                            <Badge className=" ml-2" variant="secondary"> Trending Now </Badge>
                        </div>
                        <div className="flex-1 flex items-center ">
                            <p >{post.message}</p>
                        </div>



                    </div>
                    {/* <div className="pb-4 pt-2 ">
                        <Image
                            src="/images/DeleteLater-Example-Profile-Pic.png"
                            alt="Artist Profile Picture"
                            className="border-4 border-gray-350 rounded"
                            width={300}
                            height={300}
                        />
                    </div> */}
                    <div className="flex flex-col md:flex-row md:gap-16 p-2">
                        <ProductImageCarousel
                            className="flex-1 w-full md:w-1/2"
                            images={post.images ?? []}
                            options={{
                                loop: true,
                            }}
                        />
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex-1 ">
                        <CardDescription className="">
                            <div className="flex items-center gap-4">
                                {/* </div>p>{date}</p> */}
                                <p>{formatDate(post.createdAt!)}</p>
                                <p> </p>
                            </div>
                        </CardDescription>
                    </div>

                    <div className=" flex items-center ">
                        <LikeIconToggle postId={post.id} />
                        <span className=" pr-8"> {post.numLikes}</span>
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


                {/* <NewCommentForm postId={1} /> */}
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

            <CardFooter >

                {/* Update to link to comment database*/}
                {/* <div className=" flex flex-1 space-x-4  p-1 pl-12">
                    <UserAvatar />
                    
                    <div className="flex-1 space-y-1 pr-2">
                        <div className="flex items-center gap-2 ">
                            <span className="text-sm font-medium leading-none ">User's Name</span>
                            <Image
                                className="h-3 w-3"
                                src="/images/avatar/verified1.svg"
                                alt=""
                                height={100}
                                width={100}
                            />
                            <p className=" flex-1 text-sm text-muted-foreground ml-2">
                                Rank | 687
                            </p>
                            <p className=" text-sm text-muted-foreground ml-2">
                                6d ago
                            </p>
                        </div>
                        <div className="flex-1 flex items-center ">
                            <p >This is a comment on the post. This is a comment on the post. This is a comment on the post. </p>
                        </div>
                        <LikeIconToggle />
                        <Button variant="ghost" className="rounded-xl p-1">
                            <Icons.commentReply
                                className=" h-6 w-6"
                                aria-hidden="true"
                            />
                        </Button>
                    </div>

                </div> */}
                <div className="flex-1">
                    {allCommunityPostComments.map((comment) => (
                        <CommunityPostComment key={comment.id} comment={comment} />
                    ))}
                </div>
            </CardFooter>
        </Card>

    )

}