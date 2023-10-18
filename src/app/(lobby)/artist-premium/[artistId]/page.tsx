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
import { PremiumCard } from "@/components/premium-card"

// export const metadata: Metadata = {
//     title: "Artist Community Page",
//     description: "Artist Community",
// }

// change props
interface ArtistPremiumPageProps {
    params: {
        artistId: string
    }
}

export default function ArtistDashboardPage({ params }: ArtistPremiumPageProps) {
    const artistId = Number(params.artistId)

    return (
        <Shell className="md:pb-10">
            <div className="space-y-8">
                <div className="flex-1 space-y-4 p-8 pt-6">

                    {/*//////////////////    START OF HEADER      ////////////////////////*/}
                    <div className="flex flex-col items-center">

                        <div className="relative">
                            <Image
                                className="rounded-xl"
                                src="/images/DeleteLater-Example-Banner.png"
                                alt=""
                                height={500}
                                width={1500}
                            />

                            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-2 border-white">
                                <Image
                                    src="/images/DeleteLater-Example-Profile-Pic.png"
                                    alt="Artist Profile Picture"
                                    width={200}
                                    height={200}
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
                        <Button variant="secondary" className="rounded-xl ">
                            <Icons.message
                                className="mr-2 h-5 w-5 bg-blue-550"
                                aria-hidden="true"
                            />Contact Artist
                        </Button>
                        <Button variant="secondary" className="rounded-xl ">
                            <Image
                                className="mr-2 h-6 w-6"
                                src="/images/avatar/verified1.svg"
                                alt=""
                                height={800}
                                width={800}
                            />Join

                        </Button>
                        <Button variant="secondary" className="rounded-xl">...</Button>
                    </div>

                    <div className="flex flex-col items-center space-y-4 ">

                        <h2 className="mt-3 text-3xl font-bold tracking-tight">Artist</h2>
                        <p className="text-muted-foreground">Artist Description or community description, etc. Artist Description or community description, etc.</p>
                        <ArtistDashboardNav artistId={artistId} />
                    </div>

                    {/*//////////////////    END OF HEADER      ////////////////////////*/}


                    <div className=" grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4 pt-8">
                        <div className="col-span-1">
                            <PremiumCard />
                        </div>

                        {/* <div className="col-span-2 hidden md:block"> */}
                        <div className="col-span-1">
                            <PremiumCard />
                        </div>

                        <div className="col-span-1">
                            <PremiumCard />
                        </div>

                        <div className="col-span-1">
                            <PremiumCard />
                        </div>
                    </div>

                    <div className=" grid gap-8 md:grid-cols-1 lg:grid-cols-3 pt-12">
                        <div className="col-span-1">
                            <PremiumCard />
                        </div>
                        <div className="col-span-1">
                            <PremiumCard />
                        </div>
                        <div className="col-span-1">
                            <PremiumCard />
                        </div>
                    </div>






                </div>
            </div>
        </Shell>
    )

}
