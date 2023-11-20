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
import { NewArtistPremiumPostForm } from "@/components/forms/new-artist-premium-post-form"
import { Icons } from "@/components/icons"
import { type Post } from "@/db/schema"

interface NewArtistPremiumPostDialogProps extends React.HTMLAttributes<HTMLDivElement> {
    artistId: number
}


export default function NewArtistPremiumPostDialog({ artistId }: NewArtistPremiumPostDialogProps) {
    // const artistId = Number(params.artistId)

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Icons.addCircle
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                    />Post to Access Pass</Button>
            </DialogTrigger>
            <DialogContent className=" max-w-2xl ">

                <DialogHeader>
                    <DialogTitle>Add Access Pass Post or Perk </DialogTitle>
                    <DialogDescription>
                        Add a new Access Pass post/perk for your fans here.
                    </DialogDescription>
                </DialogHeader>
                <div className="h-[50vh] overflow-auto">

                    <NewArtistPremiumPostForm artistId={artistId} />
                </div>
            </DialogContent>
        </Dialog>
    )
}