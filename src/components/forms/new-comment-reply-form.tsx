"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { replyToCommentAction } from "@/app/_actions/comments"
import { useRouter } from "next/navigation"

interface newCommentReplyProps {
    commentId: number
}

const formSchema = z.object({
    message: z.string(),
})

type Inputs = z.infer<typeof formSchema>

export function NewCommentReplyForm({ commentId }: newCommentReplyProps) {
    const [isPending, startTransition] = React.useTransition()

    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
    })

    const router = useRouter()

    function onSubmit(data: Inputs) {
        startTransition(async () => {
            await replyToCommentAction({
                commentId: commentId,
                message: data.message,
            })

            toast.success("Comment posted")
            form.reset()

            router.refresh()
        })
    }

    return (
        <Form {...form}>
            <form
                className="grid w-full  gap-5"
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea className="h-10" placeholder="Reply to community member..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-fit" disabled={isPending}>
                    {isPending && (
                        <Icons.spinner
                            className="mr-2 h-4 w-4 animate-spin"
                            aria-hidden="true"
                        />
                    )}
                    Post
                    <span className="sr-only">Post</span>
                </Button>
            </form>
        </Form>
    )
}