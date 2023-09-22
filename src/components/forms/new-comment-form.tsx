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
import { addCommentAction } from "@/app/_actions/comments"

interface newCommentProps {
    postId: number
}

const formSchema = z.object({
    message: z.string(),
})

type Inputs = z.infer<typeof formSchema>

export function NewCommentForm({ postId }: newCommentProps) {
    const [isPending, startTransition] = React.useTransition()

    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(data: Inputs) {
        startTransition(async () => {
            await addCommentAction({
                postId: postId,
                message: data.message,
            })

            toast.success("Comment posted")
            form.reset()
        })
    }

    return (
        <Form {...form}>
            <form
                className="grid w-full max-w-2xl gap-5"
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea placeholder="" {...field} />
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