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

export function NewArtistPostDialog() {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Icons.addCircle
            className="mr-2 h-5 w-5"
            aria-hidden="true"
          />Create New</Button>
      </DialogTrigger>
      <DialogContent className=" max-w-2xl ">

        <DialogHeader>
          <DialogTitle>Create New </DialogTitle>
          <DialogDescription>
            Add a new post or event here. Click post when you're done.
          </DialogDescription>
        </DialogHeader>

        {/* //////////////////    change artist ids     ////////////////// */}
        <NewArtistPostForm artistId={1} />

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
