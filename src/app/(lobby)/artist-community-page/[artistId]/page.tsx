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
import NewCommunityPostDialog from "@/components/new-community-post-dialog"
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

export const metadata: Metadata = {
    title: "Artist Community Page",
    description: "Artist Community",
}

interface ArtistCommunityPageProps {
    params: {
        artistId: string
    }
}

export default async function ArtistCommunityPage({ params }: ArtistCommunityPageProps) {
    const artistId = Number(params.artistId)

    //////////////////////////////////////////  change to artists info     ///////////////////////////////////////
    // const allCommunityPosts = await db
    //     .select()
    //     .from(posts)
    //     //.limit(4)
    //     .orderBy(desc(posts.createdAt))
    const allCommunityPosts = await getCommunityPostsAction({
        artistId,
        // limit,
    })
    // const allArtistInfo = await db
    //     .select()
    //     .from(artists)
    //     .where(eq(artists.id, artistId))

    // const [demoPosts, setDemoPosts] = useState([
    //     { id: "101", images: "", image: "", title: "Example Community Post 1", message: "I've received so many messages from you all, asking about my songwriting process. Well, today's the day I'm sharing some behind-the-scenes magic.", createdAt: "10/31/2024", username: "username1", points: "x", numLikes: "5", numComments: "10", likedByUser: true },
    //     { id: "102", images: "", image: "", title: "Example Community Post 2", message: "Guess what? I'm hitting the road again, and I'm thrilled to announce the dates and cities for my upcoming tour. ", createdAt: "10/31/2024", username: "username2", points: "x", numLikes: "9", numComments: "10", likedByUser: true },
    //     { id: "103", images: "", image: "", title: "Example Community Post 3", message: "Had a great performance at ...", createdAt: "10/31/2024", username: "username3", points: "x", numLikes: "5", numComments: "10", likedByUser: true },
    //     { id: "104", images: "", image: "", title: "Example Community Post 4", message: "Join me next week for ...", createdAt: "10/31/2024", username: "username4", points: "x", numLikes: "5", numComments: "10", likedByUser: true },
    // ]);

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

                    <div className="flex items-center gap-2">
                        <div className="flex-1 space-x-6">
                            <NewCommunityPostDialog artistId={artistId} />

                            <ViewUserPosts />
                        </div>
                        <Button variant="outline" className="rounded-xl">
                            <Icons.filter
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                            />Community Filters
                        </Button>
                    </div>

                    {/* <div className=" grid gap-4 md:grid-cols-2 lg:grid-cols-5 "> */}
                    {/* Posts */}

                    {/* <div className="col-span-1 space-y-4">

                        </div>

                        <div className="col-span-4 hidden md:block"> */}



                    {allCommunityPosts.map((post) => (

                        <CommunityPostCard key={post.id} post={post} />
                    ))}


                    {/* </div> */}
                    {/* </div> */}


                    {/* <div className="flex grid gap-4 "> */}
                    {/* Old cards */}
                    {/* <Card className="rounded-xl p-4">
                            <CardHeader className="p-2">
                                <CardTitle>Artist Announcements</CardTitle>
                                <CardDescription>
                                    Artist Announcements & Notifications
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                               
                            </CardContent>
                            <section className="grid gap-2">
                                <div>
                                    <Card className="rounded-xl ">
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
                                            <CardTitle className="text-sm font-medium">
                                                Date: XX/XX/XXXX
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-xl font-bold pb-1.5">Announcement Title</div>
                                            <p className="text-xs text-muted-foreground">
                                                Description description description description description description description description
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div>
                                    <Card className="rounded-xl ">
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
                                            <CardTitle className="text-sm font-medium">
                                                Date: XX/XX/XXXX
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-xl font-bold pb-1.5">Announcement Title</div>
                                            <p className="text-xs text-muted-foreground">
                                                Description description description description description description description description
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div>
                                    <Card className="rounded-xl ">
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
                                            <CardTitle className="text-sm font-medium">
                                                Date: XX/XX/XXXX
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-xl font-bold pb-1.5">Announcement Title</div>
                                            <p className="text-xs text-muted-foreground">
                                                Description description description description description description description description
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </section>
                        </Card> */}
                    {/* </div> */}




                </div>
            </div>
        </Shell>
    )

}

