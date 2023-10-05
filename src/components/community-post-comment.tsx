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
import { type Comment } from "@/db/schema"
import { cn, formatDate, toTitleCase } from "@/lib/utils"
import type { GetCommentReturn } from "@/types"

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

export function CommunityPostComment({
    comment,
    variant = "default",
    onSwitch,
    className,

    ...props
}: CommunityPostCommentProps) {
    return (
        <section className="  flex-1 ">
            {/* <div className=" flex flex-1 space-x-4  p-1 pl-24">
                <UserAvatar />
                <div className="flex-1 space-y-1 pr-2">
                    <div className="flex items-center gap-2 ">
                        <span className="text-sm font-medium leading-none ">User's Name</span>
                        <Image
                            className="h-3 w-3"
                            src="/images/avatar/verified1.svg"
                            alt=""
                            height={100}
                            width={100}
                        />
                        <p className=" flex-1 text-sm text-muted-foreground ml-2">
                            Rank | 687
                        </p>
                        <p className=" text-sm text-muted-foreground ml-2">
                            2d ago
                        </p>
                    </div>
                    <div className="flex-1 flex items-center ">
                        <p >This is the second most recent comment on the post </p>
                    </div>
                    <LikeIconToggle />
                    <Button variant="ghost" className="rounded-xl p-1">
                        <Icons.commentReply
                            className=" h-6 w-6"
                            aria-hidden="true"
                        />
                    </Button>
                </div>
            </div> */}
            {/* <div className=" flex flex-1 space-x-4  p-1 pl-24">
                <UserAvatar />
                <div className="flex-1 space-y-1 pr-2">
                    <div className="flex items-center gap-2 ">
                        <span className="text-sm font-medium leading-none ">User's Name</span>
                        <Image
                            className="h-3 w-3"
                            src="/images/avatar/verified1.svg"
                            alt=""
                            height={100}
                            width={100}
                        />
                        <p className=" flex-1 text-sm text-muted-foreground ml-2">
                            Rank | 687
                        </p>
                        <p className=" text-sm text-muted-foreground ml-2">
                            12h ago
                        </p>
                    </div>
                    <div className="flex-1 flex items-center ">
                        <p >This is the most recent comment on the post. This is the most recent comment on the post. This is the most recent comment on the post. This is the most recent comment on the post.  </p>
                    </div>


                    

                    <div className="flex-1 flex ">
                        <LikeIconToggle />
                        <div className="flex-1 ">
                            <CommentToggleForm postId={comment.postId} />
                        </div>
                    </div>

                </div>
            </div> */}

            <div className=" flex flex-1 space-x-4  p-1 pl-24">
                <UserAvatar />
                {/* Update to link to comment database*/}
                <div className="flex-1 space-y-1 pr-2">
                    <div className="flex items-center gap-2 ">
                        <span className="text-sm font-medium leading-none ">{comment.user}</span>
                        <Image
                            className="h-3 w-3"
                            src="/images/avatar/verified1.svg"
                            alt=""
                            height={100}
                            width={100}
                        />
                        <p className=" flex-1 text-sm text-muted-foreground ml-2">
                            Rank | 687
                        </p>
                        <p className=" text-sm text-muted-foreground ml-2">
                            {formatDate(comment.createdAt!)}
                        </p>
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
                        <LikeIconToggle postId={comment.id} />
                        <div className="flex-1 ">
                            <CommentToggleForm postId={comment.postId} />
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}


