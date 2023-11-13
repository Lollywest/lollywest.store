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
import ArtistDashboardNav from "@/components/layouts/artist-dashboard-nav"
import { PremiumCard } from "@/components/premium-card"
import { Balancer } from "react-wrap-balancer"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { checkUserArtist } from "@/app/_actions/wallet"
import { checkUserPremium } from "@/app/_actions/wallet"
import { JoinPremiumToggle } from "@/components/join-premium-toggle"
import NewArtistPremiumPostDialog from "@/components/new-artist-premium-post-dialog"
import { getArtistPostsAction } from "@/app/_actions/post"
import { HubHeaderBanner } from "@/components/hub-header-banner"
import { JoinHubToggle } from "@/components/join-hub-toggle"
import { checkUserJoined } from "@/app/_actions/wallet"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { AccessPassSubscribeButton } from "@/components/cart/access-pass-button"
import { getActiveUsersImages2 } from "@/app/_actions/store"

export const metadata: Metadata = {
    title: "Artist Premium Page",
    description: "Artist Premium",
}

interface ArtistPremiumPageProps {
    params: {
        artistId: string
    }
}

export default async function ArtistPremiumPage({ params }: ArtistPremiumPageProps) {
    const artistId = Number(params.artistId)
    const artist = await db.query.artists.findFirst({
        where: eq(artists.id, artistId)
    })
    if (!artist) {
        throw new Error("artist not found")
    }
    const isPremiumMember: boolean = await checkUserPremium({ artistId })
    const isArtist: boolean = await checkUserArtist({ artistId })
    const allArtistPosts = await getArtistPostsAction({
        artistId,
        // limit,
    })
    const isHubMember: boolean = await checkUserJoined({ artistId })
    const recentActiveUsersImages = await getActiveUsersImages2({
        artistId,
        limit: 3
    })
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
                                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 outline outline-[#788fed]/50">
                                        {/* Assuming you have an AvatarImage component to handle the image rendering */}
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


            <div className="space-y-8">
                <div className="flex-1 space-y-4 p-8 pt-6">

                    {/*//////////////////    START OF HEADER (old)      ////////////////////////*/}
                    {/* <div className="flex flex-col items-center">

                        <div className="relative">
                            {artist.images[1] !== null ? (
                                // <AspectRatio ratio={3 / 1}>
                                <Image
                                    className="rounded-xl"
                                    src={artist.images[1]!.url}
                                    alt=""
                                    height={500}
                                    width={1500}
                                />
                                // </AspectRatio>
                            ) :

                                <Image
                                    className="rounded-xl"
                                    src="/images/DeleteLater-Example-Banner.png"
                                    alt=""
                                    height={500}
                                    width={1500}
                                />

                            }


                            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-2 border-white">
                                {artist.images[0] !== null ? (
                                    <Image
                                        className="rounded-xl"
                                        src={artist.images[0]!.url}
                                        alt=""
                                        height={200}
                                        width={200}
                                    />
                                ) :
                                    <div
                                        aria-label="Image Placeholder"
                                        role="img"
                                        aria-roledescription="placeholder"
                                        className="flex aspect-square h-full w-full flex-1 items-center justify-center bg-secondary"
                                    >
                                        <Icons.placeholder
                                            className="h-9 w-9 text-muted-foreground"
                                            aria-hidden="true"
                                        />
                                    </div>
                                }

                            </div>
                        </div>
                    </div> */}

                    {/* <div className="flex items-center gap-2">
                        <div className="flex-1 ">
                            <Button variant="outline" className="rounded-xl ">
                                <Icons.send
                                    className="mr-2 h-4 w-4"
                                    aria-hidden="true"
                                />Invite a Friend </Button>

                        </div>

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
                    </div> */}


                    {/* <div className="flex flex-col items-center justify-center text-center space-y-4 ">

                        <h2 className="mt-3 text-3xl font-bold tracking-tight">{artist.name}</h2>
                        <Balancer className="max-w-[42rem] leading-normal text-muted-foreground sm:text-md sm:leading-8">
                            {artist.shortDescription}</Balancer>
                        <ArtistDashboardNav artistId={Number(params.artistId)} />
                    </div> */}
                    {/*//////////////////    END OF HEADER (old)      ////////////////////////*/}

                    {isArtist !== false ? <NewArtistPremiumPostDialog artistId={artistId} /> : null}

                    {isPremiumMember !== false ?
                        <div className=" grid gap-8 md:grid-cols-1 lg:grid-cols-3 pt-4">

                            {allArtistPosts.map(post =>
                                post.isPremium !== false ? (
                                    <PremiumCard key={post.id} post={post} />
                                ) : null
                            )}
                        </div>
                        :
                        <div className="items-center">
                            <div className="flex justify-center items-center ">
                                <JoinPremiumToggle artistId={artistId} premiumMember={isPremiumMember} />
                                <span className="text-muted-foreground"> Members Only</span>
                            </div>
                            <div className=" blur-lg grid gap-8 md:grid-cols-1 lg:grid-cols-3 pt-4">
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
                                            <CardDescription> Lock in tickets before they are released to the public! </CardDescription>
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
                            <div className=" blur-lg grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4 pt-8">

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
                    }

                </div>
            </div>
        </Shell >
    )

}
