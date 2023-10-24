
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
// import { UserProfileBadge } from "@/components/user-profile-badge"
import { Separator } from "@/components/ui/separator"
import { UserAvatar } from "@/components/user-avatar"
import { CommunityPostComment } from "@/components/community-post-comment"
import { cn, formatDate, formatTime, toTitleCase } from "@/lib/utils"

import { type Post } from "@/db/schema"
import { db } from "@/db"
import { posts, comments, artists } from "@/db/schema"
import { desc } from "drizzle-orm"
import { eq } from "drizzle-orm"
import { getAllCommentsAction, getCommentRepliesAction } from "@/app/_actions/comments"
import { getPostUserInfo } from "@/app/_actions/post"
import { getCommunityPostsAction } from "@/app/_actions/post"

import { CommentToggleForm } from "@/components/comment-toggle"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ProductImageCarousel } from "@/components/product-image-carousel"
import Link from "next/link"
import { GetPostReturn } from "@/types"
import { type StoredFile } from "@/types"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
    // post: GetPostReturn
    variant?: "default" | "switchable"
    onSwitch?: () => Promise<void>
    // title: string;
    // message: string;
    // //date: string;
    // createdAt: Date | null;
}

export function PremiumCard({
    // post,
    variant = "default",
    onSwitch,
    className,

    ...props
}: PremiumCardProps) {

    // const postId = post.id
    const limit = 3

    // const allCommunityPostComments = await getAllCommentsAction({
    //     postId,
    //     limit,
    // })



    return (
        <Card className="grid rounded-xl ">


            <CardHeader className="pb-0 pt-2">
                <div className="flex items-center gap-4">
                    <div className="flex-1 ">
                        {/* <CardTitle className="text-xl ">{post.title}</CardTitle> */}
                    </div>
                    {/* <UserProfileBadge user={CommunityPostUserInfo} /> */}
                    {/* {CommunityPostUserInfo.points} */}
                    <div className=" flex items-center space-x-4 rounded-xl border p-1">

                        {/* <UserAvatar /> */}
                        <Avatar>
                            {/* <AvatarImage src={post.image} alt="" /> */}
                            <AvatarFallback>AN</AvatarFallback>
                        </Avatar>
                        {/* Change to username */}
                        <div className="flex-1 space-y-1 pr-2">

                            <div className="flex items-center gap-2 ">
                                {/* <span className="text-sm font-medium leading-none ">{post.username}</span> */}
                                <Image
                                    className="h-3 w-3"
                                    src="/images/avatar/verified1.svg"
                                    alt=""
                                    height={100}
                                    width={100}
                                />
                            </div>

                            <p className=" flex-1 text-sm text-muted-foreground">
                                {/* Kudos | {post.points} */}
                            </p>

                        </div>

                    </div>
                </div>

            </CardHeader>
            <CardContent className="pb-0 ">

                {/* Add place to show comments ? */}
                <div className="grid grid-cols-3 gap-12">
                    <div className="flex-1 flex flex-col col-span-2">
                        {/* <CardTitle className="text-xl ">{title}</CardTitle> */}
                        <div className="pt-2 ">
                            {/* <Badge> Badge </Badge>
                            <Badge className=" ml-2" variant="secondary"> Trending Now </Badge> */}
                            Premium Card
                        </div>
                        <div className="flex-1 flex items-center ">
                            {/* <p >{post.message}</p> */}
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

                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex-1 ">
                        <CardDescription className="">
                            <div className="flex items-center gap-4">
                                {/* </div>p>{date}</p> */}
                                {/* <p>{formatDate(post.createdAt!)}</p>
                                <p> {formatTime(post.createdAt!)}</p> */}
                            </div>
                        </CardDescription>
                    </div>

                    <div className=" flex items-center ">
                        {/* <LikeIconToggle postId={post.id} liked={post.likedByUser} />
                        <span className=" pr-8"> {post.numLikes}</span> */}
                        {/* <Link
                            aria-label={`View all comments`}
                            // href={`/community-post/${post.id}`}
                        >
                            <Button variant="link" className="rounded-xl p-2">
                                <Icons.message
                                    className=" h-6 w-6"
                                    aria-hidden="true"
                                />
                            </Button>
                        </Link> */}
                        {/* <span className=" pr-8"> {post.numComments}</span> */}
                        <div className="flex-1 ">
                            {/* <CommentToggleForm postId={post.id} /> */}
                        </div>
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
                        {/* <Link
                            aria-label={`View all comments`}
                            // href={`/community-post/${post.id}`}
                        // href={`/community-post/${post.id}?artistId=${post.artistId}`}

                        >
                            <Button variant="link" className="rounded-xl p-2 text-sm text-muted-foreground">
                                ... See all Comments
                            </Button>
                        </Link> */}
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
                    {/* {allCommunityPostComments.map((comment) => (
                        // <CommunityPostComment key={comment.id} comment={comment} />
                        comment.replyingTo === 0 ? (
                            <CommunityPostComment key={comment.id} comment={comment} />
                        ) : ("")
                    ))} */}
                </div>
            </CardFooter>
        </Card>

    )

}