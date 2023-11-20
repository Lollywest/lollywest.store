import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NewCommunityPostForm } from "@/components/forms/new-community-post-form"
import { Icons } from "@/components/icons"
import { UserAvatar } from "@/components/user-avatar"
import Image from "next/image"
import { LikeIconToggle } from "@/components/like-toggle"
import { CommentToggleForm } from "@/components/comment-toggle"
import { CommentReplyToggleForm } from "@/components/comment-reply-toggle"
import { getAllCommentsAction, getCommentRepliesAction } from "@/app/_actions/comments"

import { type Comment } from "@/db/schema"
import { cn, formatDate, formatTime, formatTimeSince } from "@/lib/utils"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { User } from "@clerk/nextjs/dist/types/server"
import { GetCommentReturn } from "@/types"
import { checkUserPremium } from "@/app/_actions/wallet"


interface CommunityPostCommentReplyProps extends React.HTMLAttributes<HTMLDivElement> {
    reply: GetCommentReturn
    variant?: "default" | "switchable"
    onSwitch?: () => Promise<void>
    artistId: number

}

export function CommunityPostCommentReply({
    reply,
    variant = "default",
    onSwitch,
    className,
    artistId,
    ...props
}: CommunityPostCommentReplyProps) {


    return (
        <section className="  flex-1 ">
            {/* <div className=" flex flex-1 space-x-4  p-1 pl-24"> */}
            <div className=" flex flex-1 space-x-4  p-1 pl-0 sm:pl-24">
                {/* <UserAvatar postId={comment.id} /> */}
                <Avatar>
                    <AvatarImage src={reply.image} />
                    <AvatarFallback>
                        <Icons.user
                            className=" h-6 w-6"
                            aria-hidden="true"
                        />
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1 pr-2">
                    <div className="sm:flex items-center gap-2 flex-col sm:flex-row">
                        <span className=" flex text-sm font-medium leading-none ">
                            {reply.username}
                            {reply.userIsPremium !== false ?
                                <Image
                                    className="h-3 w-3 ml-2"
                                    src="/images/avatar/verified1.svg"
                                    alt=""
                                    height={100}
                                    width={100}
                                />
                                : null}
                        </span>

                        <div className="flex flex-1 items-center gap-4 text-sm text-muted-foreground ">
                            <div className=" flex-1 text-sm text-muted-foreground ">
                                Lolly | {reply.points}
                            </div>
                            <p> {formatTimeSince(reply.createdAt!)}</p>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center ">
                        <p > {reply.message}</p>
                    </div>


                    {/* <Button variant="ghost" className="rounded-xl p-1">
                        <Icons.commentReply
                            className=" h-6 w-6"
                            aria-hidden="true"
                        />
                    </Button> */}

                    <div className="flex-1 flex ">
                        <LikeIconToggle postId={reply.id} liked={reply.likedByUser} numLikes={(reply.likers as string[])?.length ?? 0} />
                        <div className="flex-1 ">
                            {/* <CommentToggleForm postId={comment.postId} /> */}
                            <CommentReplyToggleForm commentId={reply.id} />
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}