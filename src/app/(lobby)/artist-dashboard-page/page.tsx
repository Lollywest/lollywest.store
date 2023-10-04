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
import { ArtistDashboardNav } from "@/components/layouts/artist-dashboard-nav"
import { NewArtistPostForm } from "@/components/forms/new-artist-post-form"
import { NewArtistPostDialog} from "@/components/new-artist-post-dialog"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { Separator } from "@/components/ui/separator"


import { EventCalendar } from "@/components/event-calendar"

export const metadata: Metadata = {
    title: "Artist Dashboard Page",
    description: "Artist Dashboard",
}

// change props
interface ArtistDashboardPageProps {
    params: {
        artistId: string
    }
}

export default function ArtistDashboardPage({ params }: ArtistDashboardPageProps) {
    const artistId = Number(params.artistId)

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
                        <ArtistDashboardNav />
                    </div>

                    {/*//////////////////    END OF HEADER      ////////////////////////*/}

                    
                    

                
                        
                       
                   
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
                                    {/* <AddPostPopover/>  */}
                                    {/* <NewArtistPostForm artistId={1} /> */}
                                    <NewArtistPostDialog />
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
                                <Card className="rounded-xl my-4">
                                        <CardHeader>
                                            <CardTitle>Artist Hub Rules</CardTitle>
                                            
                                        </CardHeader>
                                        <CardContent>
                                            {/* Sample Activities */}
                                            {/* <p>- Collaborated with XYZlakdshfjasldhfkj hasdf</p>
                                            <p>- Released a new album</p>
                                            <p>- Collaborated with XYZ</p>
                                            <p>- Pooped pants</p>
                                            <p>- Pooped pants (again) </p> */}
                                            <Separator className="" />
                                             <Accordion type="single" collapsible className="w-full text-sm text-muted-foreground ">
                                                <AccordionItem value="description">
                                                <AccordionTrigger>1. Be respectful at all times</AccordionTrigger>
                                                <AccordionContent>
                                                    Do not make personal attacks, insult, or demean a specific group or person. Do not use slurs without relevant context and quotes. 
                                                    No blatant statements of bigotry. No posts that 'bait' users into breaking other rules. Zero tolerance for posts/comments that sexualize minors. 
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
                                                Only link another user's comment when it is relevant and never when it is to launch a personal attack or encourage others to do so. 
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