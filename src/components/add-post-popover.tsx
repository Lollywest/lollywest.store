import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "@/components/icons"
import { Checkbox } from "@/components/ui/checkbox"

export function AddPostPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-xl p-2 mr-2">
                    <Icons.addCircle
                        className="mr-2 h-6 w-6"
                        aria-hidden="true"
                    />Add Post or Event </Button>
            </PopoverTrigger>
            <PopoverContent className=" w-80">
                <div className="grid  gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Add New</h4>
                        <p className="text-sm text-muted-foreground">
                            Create  a new post or upcoming event
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                defaultValue="Enter Title..."
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                defaultValue="Enter Description..."
                                className="col-span-2 h-16"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="height">Add Photos</Label>
                            <Input
                                id="height"
                                defaultValue="CHANGE THIS INPUT!!!!!"
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label className="col-span-3" >Is this an Upcoming Event?</Label>

                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="event" />
                            <label
                                htmlFor="event"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Yes
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="event" />
                            <label
                                htmlFor="event"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                No
                            </label>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label className="col-span-2" htmlFor="height">Date/Time (If Event)</Label>
                            <Input
                                id="height"
                                defaultValue="Date..."
                                className="col-span-1 h-8"
                            />
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4 pt-4">
                            <Button variant="default" className="rounded-xl p-2 mr-2 col-span-2">
                                <Icons.addCircle
                                    className="mr-2 h-6 w-6"
                                    aria-hidden="true"
                                />Add Post or Event </Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
