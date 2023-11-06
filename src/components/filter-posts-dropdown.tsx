"use client"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

import React, { useState } from 'react'
import { getTopPostsAction } from "@/app/_actions/post"
import { Post } from "@/db/schema"


type FilterDropdownMenuProps = {
    posts: Post[]
    artistId: number
    timeFrame?: string
}

export function FilterDropdownMenu({ artistId, timeFrame, posts }: FilterDropdownMenuProps) {

    const [filterPosts, setPosts] = React.useTransition()

    const fetchTopPosts = async (timeFrame: string) => {
        try {
            let mappedTimeFrame: number
            switch (timeFrame) {
                case "d":
                    mappedTimeFrame = 0
                    break
                case "w":
                    mappedTimeFrame = 1
                    break
                case "m":
                    mappedTimeFrame = 2
                    break
                case "y":
                    mappedTimeFrame = 3
                    break
                default:
                    throw new Error("Invalid timeframe")
            }

            const fetchedPosts = await getTopPostsAction({
                artistId: artistId,
                timeFrame: mappedTimeFrame
            })

            // setPosts(fetchedPosts)
            // setPosts(() => Promise.resolve(fetchedPosts))
            // return fetchedPosts

            setPosts(() => {
                filterPosts = fetchedPosts  // Update state directly inside the callback
                return Promise.resolve()  // Return a promise resolving to void
            })

        } catch (error) {
            console.error("Error fetching top posts:", error)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-xl">
                    <Icons.filter className=" h-5 w-5" aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Sort By </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={() => {
                            setPosts(() => {
                                fetchTopPosts("d")
                            })
                        }}>


                        Top Today
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => fetchTopPosts("w")}>
                        Top this Week
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => fetchTopPosts("m")}>
                        Top this Month
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => fetchTopPosts("y")}>
                        Top this Year
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

