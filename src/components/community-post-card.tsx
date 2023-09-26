"use client"

import { Button } from "@/components/ui/button"
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
import { UserProfileBadge } from "@/components/user-profile-badge"
import { Separator } from "@/components/ui/separator"
import { NewCommentForm } from "@/components/forms/new-comment-form"

interface CommunityPostProps {
    title: string;
    content: string;
    date: string;
    time: string;
}

export function CommunityPostCard({ title, content, date, time }: CommunityPostProps) {

    return (
        <Card className="grid rounded-xl ">

            {/* <CardHeader className="pb-0 pt-2">
                <div className="flex items-center gap-4">
                    <div className="flex-1 ">
                        <CardTitle className="text-xl ">{title}</CardTitle>
                    </div>
                    <UserProfileBadge />
                </div>

            </CardHeader> */}
            <CardHeader className="pb-0 pt-2">
                <div className="flex items-center gap-4">
                    <div className="flex-1 ">
                        <CardTitle className="text-xl ">{title}</CardTitle>
                    </div>
                    <UserProfileBadge />
                </div>

            </CardHeader>
            <CardContent  >

                {/* Add place to show comments ? */}
                <div className="flex  gap-12">
                    <div className="flex-1 flex flex-col">
                        {/* <CardTitle className="text-xl ">{title}</CardTitle> */}
                        <div className="pt-2 ">
                            <Badge> Badge </Badge>
                            <Badge className=" ml-2" variant="secondary"> Trending Now </Badge>
                        </div>
                        <div className="flex-1 flex items-center ">
                            <p >{content}</p>
                        </div>




                    </div>
                    <div className="pb-4 pt-2 ">
                        <Image
                            src="/images/DeleteLater-Example-Profile-Pic.png"
                            alt="Artist Profile Picture"
                            className="border-4 border-gray-350 rounded"
                            width={300}
                            height={300}
                        />
                    </div>
                </div>
                <div className="flex items-center ">
                    <div className="flex-1 ">
                        <CardDescription className="">
                            <div className="flex items-center gap-4">
                                <p>{date}</p>
                                <p>{time}</p>
                            </div>

                        </CardDescription>

                    </div>

                    {/* <Button variant="ghost" className="rounded-xl p-1 " >
                    <Image
                        src="/images/avatar/heart-check.svg"
                        alt=""
                        className= "w-8 h-8 rounded "
                        width={300}  
                        height={300}
                    />
                    </Button> */}
                    <LikeIconToggle />
                    {/* Add like Quantity */}
                    <span className="pl-1">134 </span>

                    <Button variant="ghost" className="rounded-xl ml-8 p-1">
                        <Icons.message
                            className=" h-7 w-7"
                            aria-hidden="true"
                        />
                    </Button>
                    {/* Add Comment Quantity */}
                    <span className="pl-1 ">555 </span>

                    <Button variant="ghost" className="rounded-xl ml-8 p-1">
                        <Icons.share
                            className=" h-7 w-7"
                            aria-hidden="true"
                        />
                    </Button>
                </div>
                <Separator className="my-4" />

                {/* //////////////////    change user/post Id     ////////////////// */}
                <NewCommentForm postId={1} />

            </CardContent>

        </Card>

    )

}