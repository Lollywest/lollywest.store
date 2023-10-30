
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
import { type Post } from "@/db/schema"
import { cn, formatDate, toTitleCase } from "@/lib/utils"


interface UpcomingEventPostProps extends React.HTMLAttributes<HTMLDivElement> {
    post: Post
    variant?: "default" | "switchable"
    onSwitch?: () => Promise<void>
}

export function UpcomingEventCard({
    post,
    variant = "default",
    onSwitch,
    className,

    ...props
}: UpcomingEventPostProps) {
    return (
        <Card className="grid rounded-xl my-4 ">
            <Link
                aria-label={`View Event Details`}
                href={`/community-post/${post.id}`}
            >
                <CardHeader>


                    <div className="flex items-center gap-4">
                        <div className="flex-1 ">
                            <CardTitle className="text-xl">{post.title}</CardTitle>
                        </div>
                        <Icons.chevronRight
                            className="mr-2 h-10 w-10 "
                            aria-hidden="true"
                        />
                    </div>


                    <CardDescription className="">
                        <div className="flex items-center gap-4">
                            <p>{formatDate(post.createdAt!)}</p>
                        </div>
                    </CardDescription>
                </CardHeader>
                {/* <CardContent  >        
        </CardContent> */}
            </Link>
        </Card>

    )

}