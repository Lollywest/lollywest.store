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


interface DashboardPostProps {
    title: string;
    content: string;
    date: string;
    time: string;
}

export function DashboardPostCard({ title, content, date, time }: DashboardPostProps) {

    return (
        <Card className="grid rounded-xl my-4">
            {/* <CardHeader>
            <CardTitle className="text-xl ">{title}</CardTitle>  
        </CardHeader> */}
            <CardContent  >

                {/* Add place to show comments ? */}
                <div className="flex items-center gap-4">
                    <div className="flex-1 ">
                        <CardTitle className="text-xl ">{title}</CardTitle>
                        <p className="pt-10  ">{content}</p>
                    </div>
                    <div className="pl-8 pt-6 pb-4 ">
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


                    {/* UPDATE */}

                    {/* <LikeIconToggle postId={post.id} /> */}
                    {/* Add like Quantity */}
                    <span className="pl-1">134 </span>

                    <Button variant="ghost" className="rounded-xl ml-8 p-1">
                        <Icons.message
                            className=" h-7 w-7"
                            aria-hidden="true"
                        />
                    </Button>
                    {/* Add Comment Quantity */}
                    <span className="pl-1 pr-4">555 </span>


                </div>
            </CardContent>

        </Card>

    )

}