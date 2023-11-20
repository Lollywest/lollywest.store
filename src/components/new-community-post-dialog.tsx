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

interface NewCommunityPostDialogProps extends React.HTMLAttributes<HTMLDivElement> {

    artistId: number
}

export function NewCommunityPostDialog({ artistId }: NewCommunityPostDialogProps) {

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full">
                    <Icons.addCircle
                        className="mr-2 h-5 w-5 "
                        aria-hidden="true"
                    />New Community Post</Button>
            </DialogTrigger>
            <DialogContent className=" max-w-2xl ">

                <DialogHeader>
                    <DialogTitle>Create New Post </DialogTitle>
                    <DialogDescription>
                        Click post when finished to post to artist community.
                    </DialogDescription>
                </DialogHeader>

                {/* //////////////////    change artist ids     ////////////////// */}
                <NewCommunityPostForm artistId={artistId} />


            </DialogContent>
        </Dialog>
    )
}
