"use client"

import * as React from "react"
import { Button } from "@/components/ui/button";
import { NewCommentForm } from "@/components/forms/new-comment-form"
import { Icons } from "@/components/icons"

interface PostCommentToggleFormProps {
    postId: number;
}

export const PostCommentToggleForm: React.FC<PostCommentToggleFormProps> = ({ postId }) => {
    const [showForm, setShowForm] = React.useState(false);

    return (
        <div>
            <Button variant="ghost" className="rounded-xl p-1" onClick={() => setShowForm(!showForm)}>
                {showForm ? <Icons.feather
                    className=" h-6 w-6"
                    aria-hidden="true"
                /> : <Icons.feather
                    className=" h-6 w-6"
                    aria-hidden="true"
                />}
            </Button>

            {showForm && <NewCommentForm postId={postId} />}
        </div>
    );
}