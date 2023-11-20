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
import { MainNav } from "@/components/layouts/main-nav"
import { Shell } from "@/components/shells/shell"
import { ProductImageCarousel } from "@/components/product-image-carousel"
import { db } from "@/db"
import { products, artists, type Artist } from "@/db/schema"
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
import { JoinHubToggle } from "@/components/join-hub-toggle"
import { JoinPremiumToggle } from "@/components/join-premium-toggle"

import { UpcomingEventCard } from "@/components/upcoming-event-card"
import { AddPostPopover } from "@/components/add-post-popover"
import ArtistDashboardNav from "@/components/layouts/artist-dashboard-nav"
import { NewArtistPostForm } from "@/components/forms/new-artist-post-form"

// import { NewArtistPostDialog } from "@/components/new-artist-post-dialog"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"


import { EventCalendar } from "@/components/event-calendar"
import { getArtistPostsAction } from "@/app/_actions/post"
import { getCommunityPostsAction } from "@/app/_actions/post"
import NewArtistPostDialog from "@/components/new-artist-post-dialog"
import NewArtistPremiumPostDialog from "@/components/new-artist-premium-post-dialog"

import { Balancer } from "react-wrap-balancer"
import { checkUserArtist } from "@/app/_actions/wallet"
import { checkUserJoined } from "@/app/_actions/wallet"
import { checkUserPremium, checkUserPrivileges } from "@/app/_actions/wallet"
import { HubHeaderBanner } from "@/components/hub-header-banner"
import { HubHeaderProfilePic } from "@/components/hub-header-profile-pic"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { NewCommunityPostDialog } from "@/components/new-community-post-dialog"
// import { FilterDropdownMenu } from "@/components/filter-posts-dropdown"
import { AccessPassSubscribeButton } from "@/components/cart/access-pass-button"
import { RecentActivityCard } from "@/components/recent-activity-card"
import { getActiveUsersImages2 } from "@/app/_actions/store"

// export const metadata: Metadata = {
//     title: "Artist Dashboard Page",
//     description: "Artist Dashboard",
// }

// change props
interface ArtistDashboardPageProps {
    params: {
        artistId: string
    }
}

export default async function ArtistDashboardPage({ params }: ArtistDashboardPageProps) {
    const artistId = Number(params.artistId)
    const artist = await db.query.artists.findFirst({
        where: eq(artists.id, artistId)
    })
    if (!artist) {
        throw new Error("artist not found")
    }

    const privileges = await checkUserPrivileges({ artistId })
    const isArtist: boolean = privileges.artist
    const isHubMember: boolean = privileges.joined
    const isPremiumMember: boolean = privileges.premium


    // const [posts, setPosts] = useState([
    //     { title: "Exclusive Event", content: "I've received so many messages from you all, asking about my songwriting process. Well, today's the day I'm sharing some behind-the-scenes magic.Every song, to me, begins as an emotion. Maybe it's a flash of a memory, a line from a conversation, or a feeling from a dream. I usually start with humming a melody or tapping out a rhythm. From there, it's a journey of discovery, navigating the chords and finding the story I want to tell.", date: "10/31/2024", time: "4:24 AM" },
    //     { title: "Upcoming Tour!", content: "Guess what? I'm hitting the road again, and I'm thrilled to announce the dates and cities for my upcoming tour. I've been working on some new material and I can't wait to share it with you live!But it's not just about me. I want to hear from you! Comment below with the songs you'd love to hear live. Maybe even a cover or two? Let's make these shows the best yet!        ", date: "10/31/2024", time: "4:24 AM"},
    //     { title: "Recent Performance", content: "Had a great performance at ...",date: "10/31/2024", time: "4:24 AM" },
    //     { title: "Upcoming Event", content: "Join me next week for ...",date: "10/31/2024", time: "4:24 AM" },
    // ]);

    const limit = 6
    const allArtistPosts = await getArtistPostsAction({
        artistId,
        limit,
    })

    const allCommunityPosts = await getCommunityPostsAction({
        artistId,
        // limit,
    })

    const recentActiveUsersImages = await getActiveUsersImages2({
        artistId,
        limit: 3
    })

    return (
        <Shell className="md:pb-10 gap-2">
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
                            <AccessPassSubscribeButton artistId={artistId} isPremiumMember={isPremiumMember} />
                        </div>
                        {/* ////////    Update later with real pics     ////////// */}
                        <div className="flex">

                            {recentActiveUsersImages.map((image, index) => (
                                <div
                                    //   key={post.id}
                                    key={image || index}
                                    className={`relative ${index !== 0 ? '-ml-4' : ''} z-${30 - index * 10}`}
                                    style={{ zIndex: 30 - index * 10 }}
                                >
                                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                                        {image ? (
                                            <AvatarImage src={image} alt="" />
                                        ) : (
                                            <AvatarFallback>
                                                <Icons.user className="h-6 w-6" aria-hidden="true" />
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                </div>
                            ))}

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
            <div className="mx-auto w-full justify-center overflow-hidden rounded-lg">
                {/* <div className="flex-1 space-y-4 p-8 pt-6"> */}
                <div>

                    <div className="flex items-center ">
                        <div className="flex-1 p-2">

                            {isArtist !== false ? <NewArtistPostDialog artistId={artistId} /> : null}

                            <NewCommunityPostDialog artistId={artistId} />
                            {/* {isArtist !== false ? <NewArtistPremiumPostDialog artistId={artistId}/> : null} */}
                        </div>
                        {/* <FilterDropdownMenu posts={allCommunityPosts} artistId={artistId} /> */}
                    </div>
                    <div className=" grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 ">
                        {/* Posts */}

                        <div className="col-span-5 space-y-4">

                            {allCommunityPosts.map((post) => (
                                //<SamplePost key={index} {...post} />
                                post.isPremium !== true ? (
                                    <DashboardPostCard key={post.id} post={post} isArtist={isArtist} />
                                ) : null

                            ))}
                        </div>

                        {/* Sidebar: add calendar later e.g. recent activity, upcoing events popular posts */}
                        <div className="col-span-2 hidden md:block">
                            <h3 className="text-lg font-semibold leading-none tracking-tight text-center ">
                                Upcoming Events
                            </h3>
                            {allCommunityPosts.map(post =>
                                post.isEvent !== false && post.isPremium !== true ? (
                                    <UpcomingEventCard key={post.id} post={post} />
                                ) : null
                            )}

                            {/* <Card className="rounded-xl my-4">
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
                            </Card> */}

                            <h3 className="text-lg font-semibold leading-none tracking-tight text-center pt-6">
                                Recent Artist Activity
                            </h3>
                            {allArtistPosts.map(post =>

                                post.isPremium !== true ? (
                                    <RecentActivityCard key={post.id} post={post} />
                                ) : null
                            )}

                            {/* <Card className="rounded-xl my-4">

                                <CardContent className="pt-4 pb-4">
                                    <CardTitle>Recent Artist Activity</CardTitle>
                                    {allArtistPosts.map(post =>
                                        <UpcomingEventCard key={post.id} post={post} />
                                    )}
                                </CardContent>
                            </Card> */}
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    )
}
