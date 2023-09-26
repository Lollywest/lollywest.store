import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function UserAvatar() {
    return (
        //Change later to user picture 
        <Avatar>
            <AvatarImage src="/images/DeleteLater-Example-Profile-Pic.png" alt="" />
            <AvatarFallback>AN</AvatarFallback>
        </Avatar>

    )
}
