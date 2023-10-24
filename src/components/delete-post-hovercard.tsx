"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "@/components/icons"
import { Checkbox } from "@/components/ui/checkbox"
import { deletePostAction } from "src/app/_actions/post"
import { CalendarIcon } from "@radix-ui/react-icons"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import DeletePostDialog from "@/components/delete-post-dialog"

interface DeletePostHoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
    postId: number,
}


export function DeletePostHoverCard({ postId }: DeletePostHoverCardProps) {

    return (


        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="link">
                    <Icons.horizontalThreeDots
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                    /></Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-50 rounded-xl">
                <div className="flex justify-between space-x-4">
                    {/* <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar> */}
                    <div className="space-y-1">
                        {/* <h4 className="text-sm font-semibold">Issue?</h4> */}
                        <p className="text-sm">
                            <Button variant="ghost">

                                <Icons.warning
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                /> Report this content
                            </Button>

                        </p>

                        <div className="flex items-center pt-2">
                            <span className="text-xs text-muted-foreground flex-1">
                                {/* <Button variant="ghost">

                                    <Icons.close
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    Delete Post
                                </Button> */}
                                {/* <Button
                                    variant="ghost"
                                    // size="icon"
                                    // className="rounded-xl p-1 "
                                    onClick={DeletePostHandle}
                                ><Icons.close
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                    />Delete Post</Button> */}
                                <DeletePostDialog postId={postId} />
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )

}