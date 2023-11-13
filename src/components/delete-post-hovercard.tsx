"use client"
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
import { deletePostAction } from "src/app/_actions/post"
import { CalendarIcon } from "@radix-ui/react-icons"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeletePostDialog from "@/components/delete-post-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"

interface DeletePostHoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
    postId: number,
}


export function DeletePostHoverCard({ postId }: DeletePostHoverCardProps) {

    const DeletePostHandle = () => {
        void (async () => {
            await deletePostAction({ postId })
        })()
    }
    return (

        <Dialog >
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Icons.horizontalThreeDots
                        className="mr-2 ml-2 h-5 w-5"
                        aria-hidden="true"
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent>

                    <DropdownMenuItem><Button variant="ghost">

                        <Icons.warning
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                        /> Report this content
                    </Button></DropdownMenuItem>
                    <DialogTrigger asChild>
                        <DropdownMenuItem>
                            <Button variant="ghost"><Icons.close
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                            />
                                Delete Post</Button>
                        </DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your
                        post and remove it from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    {/* <DialogClose>Cancel</DialogClose> */}
                    {/* <Button type="submit">Confirm</Button> */}
                    <div>
                        <Button
                            // variant="ghost"
                            // size="icon"
                            type="submit"
                            className="rounded-xl p-1 "
                            // onClick={() => void DeletePostHandle}
                            onClick={() => DeletePostHandle()}
                        >Continue</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>


        // <DropdownMenu>
        //     <DropdownMenuTrigger asChild>
        //         <Button variant="link">
        //             <Icons.horizontalThreeDots
        //                 className="mr-2 h-5 w-5"
        //                 aria-hidden="true"
        //             /></Button>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent className="w-56">



        //         <DropdownMenuItem>
        //             <p className="text-sm">
        //                 <Button variant="ghost">

        //                     <Icons.warning
        //                         className="mr-2 h-5 w-5"
        //                         aria-hidden="true"
        //                     /> Report this content
        //                 </Button>

        //             </p></DropdownMenuItem>
        //         <DropdownMenuSeparator />
        //         <DropdownMenuItem>


        //             <DeletePostDialog postId={postId} />


        //         </DropdownMenuItem>



        //     </DropdownMenuContent>
        // </DropdownMenu>

        // <HoverCard>
        //     <HoverCardTrigger asChild>
        //         <Button variant="link">
        //             <Icons.horizontalThreeDots
        //                 className="mr-2 h-5 w-5"
        //                 aria-hidden="true"
        //             /></Button>
        //     </HoverCardTrigger>
        //     <HoverCardContent className="w-50 rounded-xl">
        //         <div className="flex justify-between space-x-4">

        //             <div className="space-y-1">
        //                 <p className="text-sm">
        //                     <Button variant="ghost">

        //                         <Icons.warning
        //                             className="mr-2 h-5 w-5"
        //                             aria-hidden="true"
        //                         /> Report this content
        //                     </Button>

        //                 </p>

        //                 <div className="flex items-center pt-2">
        //                     <span className="text-xs text-muted-foreground flex-1">

        //                         <DeletePostDialog postId={postId} />
        //                     </span>
        //                 </div>
        //             </div>
        //         </div>
        //     </HoverCardContent>
        // </HoverCard>
    )

}