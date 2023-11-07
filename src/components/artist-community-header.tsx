"use client"
import { Metadata } from "next"
import Image from "next/image"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Shell } from "@/components/shells/shell"
import { ProductImageCarousel } from "@/components/product-image-carousel"
import { and, eq, not } from "drizzle-orm"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"

import { useState } from 'react';
import { Icons } from "@/components/icons"
import { DashboardPostCard } from "@/components/dashboard-post-card"
import { desc } from "drizzle-orm"
import Link from "next/link"
import { LikeIconToggle } from "@/components/like-toggle"
import { UpcomingEventCard } from "@/components/upcoming-event-card"
import { AddPostPopover } from "@/components/add-post-popover"
import ArtistDashboardNav from "@/components/layouts/artist-dashboard-nav"
import { CommunityPostCard } from "@/components/community-post-card"
// import { NewArtistPostDialog } from "@/components/new-artist-post-dialog"
import { NewCommunityPostDialog } from "@/components/new-community-post-dialog"
import { ViewUserPosts } from "@/components/view-user-posts"

import { db } from "@/db"
import { posts, comments, artists } from "@/db/schema"
import { getCommunityPostsAction } from "@/app/_actions/post"
import { Balancer } from "react-wrap-balancer"
import { DeletePostHoverCard } from "@/components/delete-post-hovercard"
import { type StoredFile } from "@/types"
import { CommentReplyToggleForm } from "@/components/comment-reply-toggle"

import { Separator } from "@/components/ui/separator"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

interface ArtistCommunityHeaderProps {
    params: {
        artistId: string
    }
}

export default function ArtistCommunityHeader({ params }: ArtistCommunityHeaderProps) {
    const artistId = Number(params.artistId)

    const artistInfo = async () => {
        await db.query.artists.findFirst({
            where: eq(artists.id, artistId)
        })
    }

    return (
        <Shell className="md:pb-10">
            <div className="space-y-8">
                <div className="flex-1 space-y-4 p-8 pt-6">

                    {/*//////////////////    START OF HEADER      ////////////////////////*/}
                    <div className="flex flex-col items-center">

                        <div className="relative">
                            <Image
                                className="rounded-xl"
                                src="/images/demo-banner.png"
                                alt=""
                                height={350}
                                width={1400}
                            />

                            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-2 border-white">
                                <Image
                                    src="/images/demo-profile-pic.jpg"
                                    alt="Artist Profile Picture"
                                    width={400}
                                    height={400}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex-1 ">
                            <Button variant="outline" className="rounded-xl ">
                                <Icons.send
                                    className="mr-2 h-4 w-4"
                                    aria-hidden="true"
                                />Invite a Friend </Button>

                        </div>
                        {/* <Button variant="secondary" className="rounded-xl ">
                            <Icons.message
                                className="mr-2 h-5 w-5 bg-blue-550"
                                aria-hidden="true"
                            />Contact Artist
                        </Button> */}
                        <Button variant="secondary" className="rounded-xl ">
                            <Image
                                className="mr-2 h-6 w-6"
                                src="/images/avatar/verified1.svg"
                                alt=""
                                height={800}
                                width={800}
                            />Join

                        </Button>
                        <Button variant="secondary" className="rounded-xl">
                            <Icons.horizontalThreeDots
                                className=" h-5 w-5"
                                aria-hidden="true"
                            />
                        </Button>
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-4 text-center ">

                        <h2 className="mt-3 text-3xl font-bold tracking-tight">Moise</h2>
                        {/* <p className="text-muted-foreground items-center  justify-center "> */}
                        <Balancer className="max-w-[42rem] leading-normal text-muted-foreground sm:text-md sm:leading-8">
                            Welcome to the elite circle of my music journey.
                            Here, we do not just listen to music; we live it.

                            {/* </p> */}
                        </Balancer>
                        <ArtistDashboardNav artistId={artistId} />
                    </div>
                    {/*//////////////////    END OF HEADER      ////////////////////////*/}







                </div>
            </div>
        </Shell>
    )

}