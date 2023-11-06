
import { Button, buttonVariants } from "@/components/ui/button"
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
    post: GetPostReturn
    variant?: "default" | "switchable"
    onSwitch?: () => Promise<void>
    // title: string;
    // message: string;
    // //date: string;
    // createdAt: Date | null;
}

export function PremiumCard({
    post,
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
        <Card className="group relative overflow-hidden rounded-xl bg-transparent flex-grow">
            <div className="absolute inset-0 z-10 bg-zinc-950/75" />
            {/* <Image
                src="/images/demo-perk-ticket.png"
                src={post.images}
                alt={""}
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                fill
                loading="lazy"
            /> */}
            {Array.isArray(post.images) && post.images.length > 0 ? (
                <Image
                    // src="/images/demo-perk-ticket.png"
                    src={post.images[0].url}
                    alt={""}
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                    fill
                    loading="lazy"
                />
            ) :
                // If no images for perk put what ?????
                null
            }
            <CardHeader className="relative z-20">
                <Badge
                    className={cn(
                        "pointer-events-none absolute right-2 top-2 rounded px-2 py-1 font-semibold border-green-600/20 bg-green-50 text-green-700",
                    )}
                >
                    Active Now
                </Badge>
                <div
                    className={cn(
                        buttonVariants({
                            size: "icon",
                            className:
                                "pointer-events-none h-8 w-8 rounded-full bg-zinc-100 text-zinc-950",
                        })
                    )}
                    aria-hidden="true"
                >
                    <Icons.tags
                        className="h-5 w-5"
                        aria-hidden="true"
                    />
                </div>
            </CardHeader>
            <CardContent className="relative z-20">
                <CardTitle className="text-xl capitalize text-zinc-200">
                    {post.title}
                </CardTitle>
                <CardDescription> {post.message}</CardDescription>
            </CardContent>
        </Card>
    )
}