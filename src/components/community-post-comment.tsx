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
import { cn, formatDate, formatTime, formatTimeSince, toTitleCase } from "@/lib/utils"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { User } from "@clerk/nextjs/dist/types/server"
import { GetCommentReturn } from "@/types"
import { CommunityPostCommentReply } from "@/components/community-post-comment-reply"

// add interface/params

interface CommunityPostCommentProps extends React.HTMLAttributes<HTMLDivElement> {
    comment: GetCommentReturn
    variant?: "default" | "switchable"
    onSwitch?: () => Promise<void>
    // title: string;
    // message: string;
    // //date: string;
    // createdAt: Date | null;
}

export async function CommunityPostComment({
    comment,
    variant = "default",
    onSwitch,
    className,

    ...props
}: CommunityPostCommentProps) {

    const commentId = comment.id
    const allCommentReplies = await getCommentRepliesAction({
        commentId,
        // limit,
    })

    return (
        <section className="  flex-1 ">
            <div className=" flex flex-1 space-x-4  p-1 pl-24">
                {/* <UserAvatar postId={comment.id} /> */}
                <Avatar>
                    <AvatarImage src={comment.image} />
                    <AvatarFallback>
                        <Icons.user
                            className=" h-6 w-6"
                            aria-hidden="true"
                        />
                    </AvatarFallback>
                </Avatar>
                {/* Update to link to comment database*/}
                <div className="flex-1 space-y-1 pr-2">
                    <div className="flex items-center gap-2 ">
                        <span className="text-sm font-medium leading-none ">{comment.username}</span>
                        <Image
                            className="h-3 w-3"
                            src="/images/avatar/verified1.svg"
                            alt=""
                            height={100}
                            width={100}
                        />
                        <p className=" flex-1 text-sm text-muted-foreground ml-2">
                            Lolly | {comment.points}
                        </p>
                        {/* <p className=" gap-4 text-sm text-muted-foreground ml-2">
                            {formatDate(comment.createdAt!)}    {formatTime(comment.createdAt!)}

                        </p> */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {/* </div>p>{date}</p> */}
                            {/* <p>{formatDate(comment.createdAt!)}</p>
                            <p> {formatTime(comment.createdAt!)}</p> */}
                            <p> {formatTimeSince(comment.createdAt!)}</p>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center ">
                        <p > {comment.message}</p>
                    </div>


                    {/* <Button variant="ghost" className="rounded-xl p-1">
                        <Icons.commentReply
                            className=" h-6 w-6"
                            aria-hidden="true"
                        />
                    </Button> */}

                    <div className="flex-1 flex ">
                        <LikeIconToggle postId={comment.id} liked={comment.likedByUser} numLikes={(comment.likers as string[])?.length} />
                        {/* <span className=" pr-8"> {comment.numLikes}</span> */}
                        <div className="flex-1 ">
                            {/* <CommentToggleForm postId={comment.postId} /> */}
                            <CommentReplyToggleForm commentId={comment.id} />
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex-1 pl-24">
                {allCommentReplies.map((reply) => (
                    <CommunityPostCommentReply className="pl-8" key={reply.id} reply={reply} />
                    // <CommunityPostComment key={comment.id} comment={comment} />
                ))}
            </div>
        </section>
    )
}


