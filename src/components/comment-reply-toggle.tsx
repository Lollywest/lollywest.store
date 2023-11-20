"use client"

import * as React from "react"
import { Button } from "@/components/ui/button";
import { NewCommentReplyForm } from "@/components/forms/new-comment-reply-form"
import { Icons } from "@/components/icons"

interface CommentReplyToggleFormProps {
    commentId: number;
}

export const CommentReplyToggleForm: React.FC<CommentReplyToggleFormProps> = ({ commentId }) => {
    const [showForm, setShowForm] = React.useState(false);

    return (
        <div>
            <Button variant="ghost" className="rounded-xl p-1" onClick={() => setShowForm(!showForm)}>
                {showForm ? <Icons.commentReply
                    className=" h-6 w-6"
                    aria-hidden="true"
                /> : <Icons.commentReply
                    className=" h-6 w-6"
                    aria-hidden="true"
                />}
            </Button>

            {showForm && <NewCommentReplyForm commentId={commentId} />}
        </div>
    );
}