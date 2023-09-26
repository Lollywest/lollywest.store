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

export function UserProfileBadge() {
    return (
        // <div className=" flex items-center space-x-4 rounded-xl border p-1">
        <div className=" flex items-center space-x-4 rounded-xl border p-1">

            <UserAvatar />

            {/* Change to username */}
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
                </div>

                <p className=" flex-1 text-sm text-muted-foreground">
                    Rank | 687
                </p>


            </div>

        </div>
    )
}


