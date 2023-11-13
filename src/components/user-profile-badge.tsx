"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NewCommunityPostForm } from "@/components/forms/new-community-post-form"
import { Icons } from "@/components/icons"
import { UserAvatar } from "@/components/user-avatar"
import Image from "next/image"
import { User } from "@clerk/nextjs/dist/types/server"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { checkUserPremium } from "@/app/_actions/wallet"

interface UserProfileBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    userImage: string
    userUsername: string
    userPoints: number
    isUserPremium: boolean
    variant?: "default" | "switchable"
    onSwitch?: () => Promise<void>
}

export function UserProfileBadge({
    userImage,
    userUsername,
    userPoints,
    isUserPremium,
    variant = "default",
    onSwitch,
    className,

    ...props
}: UserProfileBadgeProps) {

    return (
        // <div className=" flex items-center space-x-4 rounded-xl border p-1">
        <div className=" flex items-center space-x-4 rounded-xl border p-1 bg-neutral-950">

            {/* <UserAvatar /> */}
            <Avatar>
                <AvatarImage src={userImage} alt="" />
                <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            {/* Change to username */}
            <div className="flex-1 space-y-1 pr-2">

                <div className="flex items-center gap-2 ">
                    {/* <span className="text-sm font-medium leading-none ">{"Moise"}</span> */}
                    <span className="text-sm font-medium leading-none ">{userUsername}</span>
                    {isUserPremium !== false ?
                        <Image
                            className="h-3 w-3"
                            src="/images/avatar/verified1.svg"
                            alt=""
                            height={100}
                            width={100}
                        />
                        : null}
                </div>

                <p className=" flex-1 text-sm text-muted-foreground">
                    FanXP | {userPoints}
                </p>

            </div>

        </div>
    )
}


