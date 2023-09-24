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
import { MainNav } from "@/components/layouts/main-nav"
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



export const metadata: Metadata = {
    title: "Purchased Wrap Page",
    description: "",
}

interface ArtistDashboardPageProps {
    params: {
        productId: string
    }
}




export default function ArtistDashboardPage({ params }: ArtistDashboardPageProps) {
    const [posts, setPosts] = useState([
        { title: "Exclusive Event", content: "I've received so many messages from you all, asking about my songwriting process. Well, today's the day I'm sharing some behind-the-scenes magic.Every song, to me, begins as an emotion. Maybe it's a flash of a memory, a line from a conversation, or a feeling from a dream. I usually start with humming a melody or tapping out a rhythm. From there, it's a journey of discovery, navigating the chords and finding the story I want to tell.", date: "10/31/2024", time: "4:24 AM" },
        { title: "Upcoming Tour!", content: "Guess what? I'm hitting the road again, and I'm thrilled to announce the dates and cities for my upcoming tour. I've been working on some new material and I can't wait to share it with you live!But it's not just about me. I want to hear from you! Comment below with the songs you'd love to hear live. Maybe even a cover or two? Let's make these shows the best yet!        ", date: "10/31/2024", time: "4:24 AM"},
        { title: "Recent Performance", content: "Had a great performance at ...",date: "10/31/2024", time: "4:24 AM" },
        { title: "Upcoming Event", content: "Join me next week for ...",date: "10/31/2024", time: "4:24 AM" },
    ]);
    // const allProducts = await db
    // .select()
    // .from(products)
    // .limit(4)
    // .orderBy(desc(products.createdAt))

    return (
        <Shell className="md:pb-10">
            <div className="space-y-8">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex flex-col items-center">
                        {/* <Image
                            className="rounded-full mb-4"
                            src="/images/Delete-Example-Pic.png"
                            alt=""
                            height={200}
                            width={200}
                        /> */}
                        <div className="relative">
                            <Image
                                className="rounded-xl"
                                src="/images/DeleteLater-Example-Banner.png"
                                alt=""
                                height={500}
                                width={1500}
                            />
                            {/* <div className="absolute flex items-center justify-center text-3xl font-bold -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-950 py-3 px-5 rounded-full border-4 border-white">
                                
                                Artist Name
                            </div> */}
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
                            {/* <Icons.badgeCheck
                                className="mr-2 h-6 w-6"
                                aria-hidden="true"
                            /> */}
                        </Button>
                        <Button variant="secondary" className="rounded-xl">...</Button>
                    </div>

                    


                    <Tabs defaultValue="home" className="flex flex-col items-center space-y-4 ">
                    <h2 className="mt-3 text-3xl font-bold tracking-tight">Artist</h2>    
                    <p className="text-muted-foreground">Artist Description or community description, etc. Artist Description or community description, etc.</p>
                    
                        {/* <div className="flex-1 ">
                            <Button variant="outline" className="rounded-xl ">
                                <Icons.addCircle
                                    className="mr-2 h-4 w-4"
                                    aria-hidden="true"
                                />Add a Post </Button>
                            
                        </div> */}
                        
                        <TabsList className="rounded gap-8">
                            <TabsTrigger value="home">Home</TabsTrigger>
                            <TabsTrigger value="community" >Community</TabsTrigger>
                            <TabsTrigger value="premium" disabled >Premium</TabsTrigger>
                            <TabsTrigger value="about" >About</TabsTrigger>
                            
                        </TabsList>
                   
                        <TabsContent value="home" className="space-y-4">
                            <div className="flex items-center ">
                                <div className="flex-1 ">
                                    {/* <Button variant="outline" className="rounded-xl p-2 mr-2">
                                        <Icons.addCircle
                                            className="mr-2 h-6 w-6"
                                            aria-hidden="true"
                                        />Add Post </Button>
                                    <Button variant="outline" className="rounded-xl p-2">
                                        <Icons.addCircle
                                            className="mr-2 h-6 w-6"
                                            aria-hidden="true"
                                        />Add Event </Button> */}
                                    <AddPostPopover/> 
                                </div>                                
                            </div>
                            <div className=" grid gap-4 md:grid-cols-2 lg:grid-cols-7 ">
                                {/* Posts */}
                                
                                <div className="col-span-5 space-y-4">

                                    {posts.map((post, index) => (
                                        //<SamplePost key={index} {...post} />
                                        <DashboardPostCard key={index} {...post} />
                                    ))}
                                </div>

                                {/* Sidebar: add calendar later e.g. recent activity, upcoing events popular posts */}
                                <div className="col-span-2 hidden md:block">
                                    {/* <Calendar/> */}
                                    {posts.map((post, index) => (
                                        // <UpcomingEventPost key={index} {...post} />
                                        <UpcomingEventCard key={index} {...post} />
                                    ))}
                                    


                                    <Card className="rounded-xl my-4">
                                        <CardHeader>
                                            <CardTitle>Recent Activity</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {/* Sample Activities */}
                                            <p>- Collaborated with XYZlakdshfjasldhfkj hasdf</p>
                                            <p>- Released a new album</p>
                                            <p>- Collaborated with XYZ</p>
                                            <p>- Pooped pants</p>
                                            <p>- Pooped pants (again) </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>



                        <TabsContent value="community" className="space-y-4">
                            <div className="flex grid gap-4 ">
                                <Card className="rounded-xl p-4">
                                    <CardHeader className="p-2">
                                        <CardTitle>Artist Announcements</CardTitle>
                                        <CardDescription>
                                            Artist Announcements & Notifications
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {/* <UpcomingEvents /> */}
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
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="about" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                <Card className="col-span-2 rounded-xl">
                                    {/* <CardHeader>
                                            <CardTitle>Artist Name</CardTitle>
                                        </CardHeader> */}
                                    <CardContent className=" p-0 ">
                                        {/* <Overview /> */}
                                        {/* <section className="mx-auto w-full justify-center overflow-hidden rounded-lg"> */}
                                        <div >
                                            <Image
                                                className="rounded-xl"
                                                src="/images/Delete-Example-Pic.png"
                                                alt=""
                                                height={1000}
                                                width={1000}
                                            />
                                        </div>
                                        {/* </section> */}
                                    </CardContent>
                                </Card>
                                <Card className="col-span-5 rounded-xl">
                                    <CardHeader>
                                        <CardTitle>Upcoming</CardTitle>
                                        <CardDescription>
                                            Upcoming Artist Events
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {/* <UpcomingEvents /> */}
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card className="rounded-xl">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Monthly Perk 1
                                        </CardTitle>
                                        {/* <Badge variant="destructive">VIP</Badge> */}
                                        <Badge>In-Person</Badge>

                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">Backstage Passes</div>
                                        <p className="text-xs text-muted-foreground">
                                            Link or something
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="rounded-xl">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Monthly Perk 2
                                        </CardTitle>
                                        <Badge variant="secondary">Online</Badge>

                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">Exclusive AMA</div>
                                        <p className="text-xs text-muted-foreground">
                                            Link or Something
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="rounded-xl">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Monthly Perk 3</CardTitle>
                                        <Badge variant="secondary">Online</Badge>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">Game with Artist</div>
                                        <p className="text-xs text-muted-foreground">
                                            Link or Something
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="rounded-xl">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Monthly Perk 4
                                        </CardTitle>
                                        <Badge >In-Person</Badge>

                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">Exculsive Event</div>
                                        <p className="text-xs text-muted-foreground">
                                            Link or something
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>











                    
                </div>
            </div>
        </Shell>
    )
}
// interface ArtistDashboardPageProps {
//     params: {
//         productId: string
//     }
// }

// export default function ArtistDashboardPage({ params }: ArtistDashboardPageProps) {
//     const productId = Number(params.productId)

//     // const product = await db.query.products.findFirst({
//     //     where: eq(products.id, productId),
//     // })
//     // if (!product) {
//     //     notFound()
//     // }
//     return (
//         <Shell className="md:pb-10">
//             <div className="space-y-8">
//                 <div className="flex-1 space-y-4 p-8 pt-6">
//                     <div className="flex items-center justify-between space-y-2">
//                         <h2 className="text-3xl font-bold tracking-tight">Artist Dashboard</h2>
//                         <div className="flex items-center space-x-2 ">

//                             <Button className="rounded-xl">Contact Artist</Button>
//                         </div>
//                     </div>
                    
//                 </div>
//             </div>
//         </Shell>
//     )
// }