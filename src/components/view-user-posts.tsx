import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Icons } from "@/components/icons"
import { Separator } from "@/components/ui/separator"

export function ViewUserPosts() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="rounded-full">
                    <Icons.view
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                    />View Your Posts
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Your Posts</SheetTitle>
                    <SheetDescription>
                        View or delete your previous posts here. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <Separator />

                    {/* <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3" />
                    </div> */}
                </div>
                <SheetFooter>
                    <SheetClose asChild>

                        <Button type="submit">Save changes</Button>


                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
