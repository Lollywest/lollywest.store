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
import { NewArtistPostForm } from "@/components/forms/new-artist-post-form"
import { Icons } from "@/components/icons"
import { type Post } from "@/db/schema"

interface NewArtistPostDialogProps extends React.HTMLAttributes<HTMLDivElement> {

  artistId: number
}


export default function NewArtistPostDialog({ artistId }: NewArtistPostDialogProps) {
  // const artistId = Number(params.artistId)

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full mr-2">
          <Icons.addCircle
            className="mr-2 h-5 w-5"
            aria-hidden="true"
          />New Artist Post</Button>
      </DialogTrigger>
      <DialogContent className=" max-w-2xl ">

        <DialogHeader>
          <DialogTitle>Create New Artist Post</DialogTitle>
          <DialogDescription>
            Add a new post or event here. Click post when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="h-[50vh] overflow-auto pr-4">
          <NewArtistPostForm artistId={artistId} />
        </div>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div> */}
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
