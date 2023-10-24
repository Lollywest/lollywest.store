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
import { Balancer } from "react-wrap-balancer"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"


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

                    {/*//////////////////    START OF HEADER (FOR DEMO)      ////////////////////////*/}
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
                            Here, we don&apos;t just listen to music; we live it.
                            Come amplify your experience and dance to the rhythm of exclusivity - let&apos;s resonate together.
                            {/* </p> */}
                        </Balancer>
                        <ArtistDashboardNav artistId={artistId} />
                    </div>
                    {/*//////////////////    END OF HEADER (FOR DEMO)      ////////////////////////*/}




                    <div className=" grid gap-8 md:grid-cols-1 lg:grid-cols-3 pt-4">
                        {/* ///////////////////////////     DEMO ACTIVE PERK 1       /////////////////////////// */}
                        <div className="flex col-span-1">
                            {/* <Link
                            aria-label={category.title}
                            key={category.title}
                            href={`/categories/${category.title}`}
                            > */}
                            <Card className="group relative overflow-hidden rounded-xl bg-transparent flex-grow">
                                <div className="absolute inset-0 z-10 bg-zinc-950/75" />
                                <Image
                                    src="/images/demo-perk-ticket.png"
                                    alt={""}
                                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                                    fill
                                    loading="lazy"
                                />
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
                                        Pre-Sale Tickets
                                    </CardTitle>
                                    <CardDescription> Lock in tickets before they&apos;re released to the public! </CardDescription>
                                </CardContent>
                            </Card>
                            {/* </Link> */}
                        </div>

                        {/* ///////////////////////////     DEMO ACTIVE PERK 2       /////////////////////////// */}
                        <div className="flex col-span-1">
                            {/* <Link
                            aria-label={category.title}
                            key={category.title}
                            href={`/categories/${category.title}`}
                            > */}
                            <Card className="group relative overflow-hidden rounded-xl bg-transparent flex-grow">
                                <div className="absolute inset-0 z-10 bg-zinc-950/75" />

                                <Image
                                    src="/images/demo-perk-vip.png"
                                    alt={""}
                                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                                    fill
                                    loading="lazy"
                                />
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
                                        <Icons.ticket
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="relative z-20">
                                    <CardTitle className="text-xl capitalize text-zinc-200">
                                        VIP & Early Entry
                                    </CardTitle>
                                    <CardDescription> Free VIP access and early entry at all of my shows  </CardDescription>
                                </CardContent>
                            </Card>
                            {/* </Link> */}
                        </div>

                        {/* ///////////////////////////     DEMO ACTIVE PERK 3       /////////////////////////// */}
                        <div className="flex col-span-1">
                            {/* <Link
                            aria-label={category.title}
                            key={category.title}
                            href={`/categories/${category.title}`}
                            > */}
                            <Card className="group relative overflow-hidden rounded-xl bg-transparent flex-grow">
                                <div className="absolute inset-0 z-10 bg-zinc-950/75" />

                                <Image
                                    src="/images/demo-perk-ama.png"
                                    alt={""}
                                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                                    fill
                                    loading="lazy"
                                />

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
                                        <Icons.shieldCheck
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="relative z-20">
                                    <CardTitle className="text-xl capitalize text-zinc-200">
                                        Live AMA
                                    </CardTitle>
                                    <CardDescription> Exclusive monthly sessions Access Pass holders </CardDescription>
                                </CardContent>
                            </Card>
                            {/* </Link> */}

                        </div>
                    </div>


                    <div className=" grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4 pt-8">

                        {/*//////////////////    INACTIVE PERK 1     ////////////////////////*/}
                        <div className="flex col-span-1">
                            {/* <div className="col-span-1"> */}
                            {/* <Link
                                    aria-label={category.title}
                                    key={category.title}
                                    href={`/categories/${category.title}`}
                                    > */}
                            <Card className="group relative overflow-hidden rounded-xl bg-transparent flex-grow">
                                <div className="absolute inset-0 z-10 bg-zinc-950/75" />

                                <Image
                                    src="/images/demo-perk-ama.png"
                                    alt={""}
                                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                                    fill
                                    loading="lazy"
                                />

                                <CardHeader className="relative z-20">
                                    <Badge
                                        className={cn(
                                            "pointer-events-none absolute right-2 top-2 rounded px-2 py-1 font-semibold border-red-600/10 bg-red-50 text-red-700",

                                        )}
                                    >
                                        Expired
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
                                        <Icons.volumne
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="relative z-20">
                                    <CardTitle className="text-xl capitalize text-zinc-200">
                                        Exclusive first listen
                                    </CardTitle>
                                    <CardDescription> Get a live first taste of my album before its released </CardDescription>
                                </CardContent>
                            </Card>
                            {/* </Link> */}

                            {/* </div> */}
                        </div>

                        {/*//////////////////    INACTIVE PERK 2     ////////////////////////*/}
                        <div className="flex col-span-1">
                            {/* <div className="col-span-1"> */}
                            {/* <Link
    aria-label={category.title}
    key={category.title}
    href={`/categories/${category.title}`}
    > */}
                            <Card className="group relative overflow-hidden rounded-xl bg-transparent flex-grow">
                                <div className="absolute inset-0 z-10 bg-zinc-950/75" />

                                <Image
                                    src="/images/demo-perk-merch.png"
                                    alt={""}
                                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                                    fill
                                    loading="lazy"
                                />

                                <CardHeader className="relative z-20">
                                    <Badge
                                        className={cn(
                                            "pointer-events-none absolute right-2 top-2 rounded px-2 py-1 font-semibold border-red-600/10 bg-red-50 text-red-700",

                                        )}
                                    >
                                        Expired
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
                                        <Icons.clothing
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="relative z-20">
                                    <CardTitle className="text-xl capitalize text-zinc-200">
                                        Limited Edition Merch
                                    </CardTitle>
                                    <CardDescription> Only 50 available. Max 1 per Access Pass.  </CardDescription>
                                </CardContent>
                            </Card>
                            {/* </Link> */}

                            {/* </div> */}
                        </div>

                        {/*//////////////////    INACTIVE PERK 3     ////////////////////////*/}
                        <div className="flex col-span-1">
                            {/* <div className=" col-span-1"> */}
                            {/* <Link
    aria-label={category.title}
    key={category.title}
    href={`/categories/${category.title}`}
    > */}
                            <Card className="group relative overflow-hidden rounded-xl bg-transparent flex-grow">
                                <div className="absolute inset-0 z-10 bg-zinc-950/75" />

                                <Image
                                    src="/images/demo-perk-private-show.png"
                                    alt={""}
                                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                                    fill
                                    loading="lazy"
                                />

                                <CardHeader className="relative z-20">
                                    <Badge
                                        className={cn(
                                            "pointer-events-none absolute right-2 top-2 rounded px-2 py-1 font-semibold border-red-600/10 bg-red-50 text-red-700",

                                        )}
                                    >
                                        Expired
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
                                        <Icons.ticket
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="relative z-20">
                                    <CardTitle className="text-xl capitalize text-zinc-200">
                                        Private Show
                                    </CardTitle>
                                    <CardDescription> Free for Access Pass holders! </CardDescription>
                                </CardContent>
                            </Card>
                            {/* </Link> */}

                            {/* </div> */}
                        </div>

                        {/*//////////////////    INACTIVE PERK 4     ////////////////////////*/}
                        <div className=" flex col-span-1">
                            {/* <div className="flex-col col-span-1"> */}
                            {/* <Link
                                    aria-label={category.title}
                                    key={category.title}
                                    href={`/categories/${category.title}`}
                                    > */}
                            <Card className="group relative overflow-hidden rounded-xl bg-transparent flex-grow">
                                <div className="absolute inset-0 z-10 bg-zinc-950/75" />

                                <Image
                                    src="/images/demo-profile-pic.jpg"
                                    alt={""}
                                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                                    fill
                                    loading="lazy"
                                />

                                <CardHeader className="relative z-20">
                                    <Badge
                                        className={cn(
                                            "pointer-events-none absolute right-2 top-2 rounded px-2 py-1 font-semibold border-red-600/10 bg-red-50 text-red-700",

                                        )}
                                    >
                                        Expired
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
                                        <Icons.shieldCheck
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="relative z-20">
                                    <CardTitle className="text-xl capitalize text-zinc-200">
                                        Meet & Greet
                                    </CardTitle>
                                    <CardDescription> Come hangout after the show! </CardDescription>
                                </CardContent>
                            </Card>
                            {/* </Link> */}

                            {/* </div> */}
                        </div>
                    </div>

                </div>
            </div>
        </Shell >
    )

}
