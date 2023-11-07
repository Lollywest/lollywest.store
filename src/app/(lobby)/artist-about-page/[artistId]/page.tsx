
import * as React from "react"
import { Metadata } from "next"
import Image from "next/image"
import { Shell } from "@/components/shells/shell"
import { ProductImageCarousel } from "@/components/product-image-carousel"
import { db } from "@/db"
import { products, artists } from "@/db/schema"
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
import IconLink from "@/components/icon-link"
import { checkUserArtist } from "@/app/_actions/wallet"
import { UpdateArtistAboutForm } from "@/components/forms/update-artist-about-form"
import { type StoredFile } from "@/types"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { Balancer } from "react-wrap-balancer"
import { HubHeaderBanner } from "@/components/hub-header-banner"
import { JoinHubToggle } from "@/components/join-hub-toggle"
import { JoinPremiumToggle } from "@/components/join-premium-toggle"
import { checkUserJoined } from "@/app/_actions/wallet"
import { checkUserPremium } from "@/app/_actions/wallet"
import { AccessPassSubscribeButton } from "@/components/cart/access-pass-button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
    title: "Artist Community Page",
    description: "Artist Community",
}

// change props
interface ArtistAboutPageProps {
    params: {
        artistId: string
    }
}

export default async function ArtistAboutPage({ params }: ArtistAboutPageProps) {
    const artistId = Number(params.artistId)
    const artist = await db.query.artists.findFirst({
        where: eq(artists.id, artistId)
    })

    if (!artist) {
        throw new Error("artist not found")
    }

    const isArtist: boolean = await checkUserArtist({ artistId })
    const isHubMember: boolean = await checkUserJoined({ artistId })
    const isPremiumMember: boolean = await checkUserPremium({ artistId })

    return (
        <Shell className="md:pb-10">
            {/* //////////      Header Section      ////////// */}
            <section className="mx-auto w-full justify-center overflow-hidden rounded-lg">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <HubHeaderBanner artist={artist} />
                    </div>
                </div>
                <div className="pt-1">
                    <div className="flex items-center gap-2">
                        <JoinHubToggle artistId={artistId} hubMember={isHubMember} />
                        <div className="flex-1 flex-row">
                            {/* <JoinPremiumToggle artistId={artistId} premiumMember={isPremiumMember} /> */}
                            {/* //////////  Update later w/ productId (or artistId ?) */}
                            <AccessPassSubscribeButton productId={0} artistId={artistId} isPremiumMember={isPremiumMember} />
                        </div>
                        {/* ////////    Update later with real pics     ////////// */}
                        <div className="flex">
                            <div className="relative z-30 ">
                                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 outline outline-[#0686B3]">
                                    <AvatarFallback>
                                        <Icons.user className="h-6 w-6" aria-hidden="true" />
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="relative -ml-4 z-20 outline-[#0686B3]">
                                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 outline outline-[#0686B3]">
                                    <AvatarFallback>
                                        <Icons.user className="h-6 w-6" aria-hidden="true" />
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="relative -ml-4 z-10">
                                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 outline outline-[#0686B3]">
                                    <AvatarFallback>
                                        <Icons.user className="h-6 w-6" aria-hidden="true" />
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="relative -ml-4 z-0">
                                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ">
                                    <AvatarFallback>
                                        <Icons.horizontalThreeDots className="h-4 w-4" aria-hidden="true" />
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            {/* <span className = "text-muted-foreground text-xs ">
                            Members
                        </span> */}
                        </div>

                    </div>
                    <div className="flex flex-col items-center justify-center text-center space-y-4 ">
                        {/* <h2 className="mt-3 text-3xl font-bold tracking-tight">{artist.name}</h2>
                        <Balancer className="max-w-[42rem] leading-normal text-muted-foreground sm:text-md sm:leading-8">
                            {artist.shortDescription}</Balancer> */}
                        <ArtistDashboardNav artistId={Number(params.artistId)} />
                    </div>
                </div>
            </section>
            {/* //////////      End of Header Section      ////////// */}

            {/* <div className="space-y-8"> */}
            <div className=" grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 ">
                {/* <div className="flex-1 space-y-4 p-8 pt-6"> */}
                <div className="col-span-5 space-y-4 ">
                    <UpdateArtistAboutForm artist={artist} isArtist={isArtist} />
                </div>
                <div className="col-span-2 hidden md:block">
                    <Card className="rounded-xl my-8">
                        <CardHeader>
                            <CardTitle>Artist Hub Rules</CardTitle>
                        </CardHeader>
                        <CardContent>

                            <Separator className="" />
                            <Accordion type="single" collapsible className="w-full text-sm text-muted-foreground ">
                                <AccordionItem value="description">
                                    <AccordionTrigger>1. Be respectful at all times</AccordionTrigger>
                                    <AccordionContent>
                                        Do not make personal attacks, insult, or demean a specific group or person. Do not use slurs without relevant context and quotes.
                                        No blatant statements of bigotry. No posts that &apos;bait&apos; users into breaking other rules. Zero tolerance for posts/comments that sexualize minors.
                                        Zero tolerance for posts/comments that encourage suicide
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>2. No spam</AccordionTrigger>
                                    <AccordionContent> Do not post spam or any machine generated content. Do not edit comments to mislead and/or advertise. Do not farm likes or shotgun comments</AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>
                                        3. No personal info
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Do not post or seek any real or fake personal information (examples include: full names, phone numbers, email addresses, or social media accounts).
                                        Only link another user&apos;s comment when it is relevant and never when it is to launch a personal attack or encourage others to do so.
                                        Do not ask questions designed to target specific usernames or links to social media.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger>
                                        4. No loaded questions
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Do not include an opinion, bias, or lead respondents towards expressing a specific opinion in your post title. Do not use this subreddit to promote a specific agenda or to gain positive or negative publicity for an entity or person
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-5">
                                    <AccordionTrigger>
                                        5. No begging
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Do not ask for any rewards, money, goods, services, or favors.
                                        Do not form a brigade to draw positive or negative attention to posts or comments in the hub, even from other artist hubs/communities .                                                </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </Shell >
    )

}

