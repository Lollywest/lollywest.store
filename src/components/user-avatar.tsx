import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

interface UserAvatarProps {
    postId: number;
}

export function UserAvatar({ postId }: UserAvatarProps) {
    return (
        //Change later to user picture 
        <Avatar>
            <AvatarImage src="/images/DeleteLater-Example-Profile-Pic.png" alt="" />
            <AvatarFallback>AN</AvatarFallback>
        </Avatar>

    )
}
