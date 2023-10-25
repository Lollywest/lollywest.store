
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
import { type Artist } from "@/db/schema"

interface LobbyCommunityCardProps extends React.HTMLAttributes<HTMLDivElement> {
    artist: Artist
    // variant?: "default" | "switchable"
    onSwitch?: () => Promise<void>
    // title: string;
    // message: string;
    // //date: string;
    // createdAt: Date | null;
}

export function LobbyCommunityCard({
    artist,
    // variant = "default",
    onSwitch,
    className,

    ...props
}: LobbyCommunityCardProps) {


    return (
        <Card className="group relative overflow-hidden rounded-xl bg-transparent flex-grow">
            <Link
                aria-label={`View details`}
                //   href={`//${artist.id}`}
                href={`/artist-dashboard-page/${artist.id}`}
            >
                <div className="absolute inset-0 z-10 bg-zinc-950/75" />
                {/* <Image
                                    src="/images/demo-perk-ticket.png"
                                    alt={""}
                                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                                    fill
                                    loading="lazy"
                                /> */}
                {artist.images[1] !== null ? (
                    // <AspectRatio ratio={3 / 1}>
                    <Image
                        className="rounded-xl object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        src={artist.images[1]!.url}
                        alt=""
                        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                        fill

                    />
                    // </AspectRatio>
                ) :
                    <Image
                        className="rounded-xl object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        src="/images/DeleteLater-Example-Banner.png"
                        alt=""
                        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                        fill
                    />
                }
                <CardHeader className="relative z-20">
                    {/* <Badge
                        className={cn(
                            "pointer-events-none absolute right-2 top-2 rounded px-2 py-1 font-semibold border-green-600/20 bg-amber-50 text-amber-700",

                        )}
                    >
                        Community
                    </Badge> */}
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
                        {/* <Icons.tags
                        className="h-5 w-5"
                        aria-hidden="true"
                    /> */}
                        {artist.images[0] !== null ? (
                            // <AspectRatio ratio={3 / 1}>
                            // <Image
                            //     className="rounded-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                            //     src={artist.images[0]!.url}
                            //     alt=""
                            //     height = 


                            // />
                            <Avatar className="h-14 w-14">
                                <AvatarImage src={artist.images[0]!.url} alt="" />
                            </Avatar>
                            // </AspectRatio>
                        ) :
                            <Avatar className="h-14 w-14">
                                <AvatarFallback><Icons.user
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                /></AvatarFallback>
                            </Avatar>
                        }
                    </div>
                </CardHeader>
                <CardContent className="relative z-20">
                    <CardTitle className="text-xl capitalize text-zinc-200">
                        {artist.name}
                    </CardTitle>
                    <CardDescription> Description Description </CardDescription>
                </CardContent>
            </Link>
        </Card>

    )

}