"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { userNamePageSchema } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { updateUsernameAction } from "@/app/_actions/wallet"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

type Inputs = z.infer<typeof userNamePageSchema>

export default function UsernamePage() {
    const router = useRouter()
    const [isPending, startTransition] = React.useTransition()

    const form = useForm<Inputs>({
        resolver: zodResolver(userNamePageSchema),
        defaultValues: {
            username: "",
            firstName: "",
            lastName: "",
        },
    })

    function onSubmit(data: Inputs) {
        startTransition(async () => {
            await updateUsernameAction(data)

            router.push("/")
        })
    }

    return (
        <Card className="overflow-hidden rounded-3xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Add Username</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className="grid gap-4"
                        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="musiclover3301" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Smith" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p className="text-slate-400">Your name will only be shown to musicians whose access pass you&apos;ve purchased</p>
                        <Button disabled={isPending}>
                            {isPending && (
                                <Icons.spinner
                                    className="mr-2 h-4 w-4 animate-spin"
                                    aria-hidden="true"
                                />
                            )}
                            Save
                            <span className="sr-only">Save</span>
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}