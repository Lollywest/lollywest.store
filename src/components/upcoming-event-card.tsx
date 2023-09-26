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
import Link from "next/link"


interface UpcomingEventPostProps {
    title: string;
    content: string;
    date: string;
    time: string;
}

export function UpcomingEventCard({ title, content, date, time }: UpcomingEventPostProps) {

    return (
        <Card className="grid rounded-xl my-4 ">
            <Link
                aria-label={`View details`}
                //   href={`//${artist.id}`}
                href="/artist-community-page"
            >
                <CardHeader>


                    <div className="flex items-center gap-4">
                        <div className="flex-1 ">
                            <CardTitle className="text-xl">{title}</CardTitle>
                        </div>
                        <Icons.chevronRight
                            className="mr-2 h-10 w-10 "
                            aria-hidden="true"
                        />
                    </div>


                    <CardDescription className="">
                        <div className="flex items-center gap-4">
                            <p>{date}</p>
                            <p>{time}</p>
                        </div>
                    </CardDescription>
                </CardHeader>
                {/* <CardContent  >        
        </CardContent> */}
            </Link>
        </Card>

    )

}